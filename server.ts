import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Helper to seed/ensure default hotel rooms ---
async function ensureDefaultRooms() {
  try {
    const defaultTypes = [
      { name: 'Standard Room', shortName: 'Standard', price: 500000, capacity: 2, amenities: '["wifi","tv","air_conditioning"]' },
      { name: 'Deluxe Room', shortName: 'Deluxe', price: 850000, capacity: 2, amenities: '["wifi","tv","air_conditioning","minibar","city_view"]' },
      { name: 'Suite Room', shortName: 'Suite', price: 1500000, capacity: 4, amenities: '["wifi","tv","air_conditioning","minibar","living_room","bathtub"]' },
    ];

    const typeMap: Record<string, string> = {};

    for (const dt of defaultTypes) {
      let rt = await prisma.roomType.findFirst({
        where: { name: dt.name }
      });
      if (!rt) {
        rt = await prisma.roomType.create({
          data: {
            name: dt.name,
            description: `${dt.shortName} hotel accommodation`,
            base_price: dt.price,
            capacity: dt.capacity,
            amenities: dt.amenities,
          }
        });
      }
      typeMap[dt.shortName] = rt.id;
    }

    const defaultRooms = [
      { number: '101', type: 'Standard', floor: '1' },
      { number: '102', type: 'Standard', floor: '1' },
      { number: '105', type: 'Standard', floor: '1' },
      { number: '201', type: 'Deluxe', floor: '2' },
      { number: '203', type: 'Deluxe', floor: '2' },
      { number: '204', type: 'Deluxe', floor: '2' },
      { number: '205', type: 'Deluxe', floor: '2' },
      { number: '301', type: 'Suite', floor: '3' },
      { number: '302', type: 'Suite', floor: '3' },
      { number: '305', type: 'Suite', floor: '3' },
    ];

    for (const dr of defaultRooms) {
      const existing = await prisma.room.findUnique({
        where: { room_number: dr.number }
      });
      if (!existing && typeMap[dr.type]) {
        await prisma.room.create({
          data: {
            room_number: dr.number,
            room_type_id: typeMap[dr.type],
            status: 'available',
            floor: dr.floor,
          }
        });
      }
    }
  } catch (err) {
    console.error('Error ensuring default rooms:', err);
  }
}

// Helper to get or create room matching input string e.g. "203 · Deluxe" or "203"
async function getOrCreateRoom(roomStr: string) {
  const cleanStr = (roomStr || '').trim();
  const roomNumber = cleanStr.split(/[\s·]/)[0] || '101';
  
  let roomRecord = await prisma.room.findUnique({
    where: { room_number: roomNumber },
    include: { room_type: true }
  });

  if (!roomRecord) {
    let typeName = 'Standard';
    if (roomNumber.startsWith('2') || cleanStr.toLowerCase().includes('deluxe')) typeName = 'Deluxe';
    if (roomNumber.startsWith('3') || cleanStr.toLowerCase().includes('suite')) typeName = 'Suite';

    let roomType = await prisma.roomType.findFirst({
      where: { name: { contains: typeName } }
    });

    if (!roomType) {
      roomType = await prisma.roomType.create({
        data: {
          name: `${typeName} Room`,
          base_price: typeName === 'Suite' ? 1500000 : typeName === 'Deluxe' ? 850000 : 500000,
          capacity: typeName === 'Suite' ? 4 : 2,
        }
      });
    }

    roomRecord = await prisma.room.create({
      data: {
        room_number: roomNumber,
        room_type_id: roomType.id,
        status: 'available',
        floor: roomNumber.charAt(0) || '1'
      },
      include: { room_type: true }
    });
  }

  return roomRecord;
}

// Initialize default rooms
ensureDefaultRooms();

// --- ROUTES ---

// Root Status
app.get('/', (req, res) => {
  res.json({ message: 'Calam API Server is running normally!' });
});

// Rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: { room_type: true },
      orderBy: { room_number: 'asc' }
    });
    
    // Map to convenient format
    const formattedRooms = rooms.map(r => ({
      id: r.room_number,
      dbId: r.id,
      roomNumber: r.room_number,
      type: r.room_type?.name?.replace(' Room', '') || 'Standard',
      status: r.status,
      floor: r.floor,
      basePrice: r.room_type?.base_price || 500000,
    }));

    res.json(formattedRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const dbBookings = await prisma.booking.findMany({
      include: { 
        guest: true, 
        booking_items: { 
          include: { 
            room: { 
              include: { room_type: true } 
            } 
          } 
        }, 
        payments: true 
      },
      orderBy: { created_at: 'desc' }
    });
    
    // Map backend model to frontend UI format
    const formattedBookings = dbBookings.map(b => {
      // Map statuses
      let uiStatus: 'Pending' | 'Confirmed' | 'Checked-in' | 'Checked-out' = 'Pending';
      if (b.status === 'confirmed') uiStatus = 'Confirmed';
      if (b.status === 'checked_in') uiStatus = 'Checked-in';
      if (b.status === 'checked_out') uiStatus = 'Checked-out';
      
      let uiPayment: 'Paid' | 'Unpaid' | 'Partial' = 'Unpaid';
      const payment = b.payments[0];
      if (payment) {
        if (payment.status === 'completed') uiPayment = 'Paid';
        if (payment.status === 'pending') uiPayment = 'Partial';
      }

      // Format total
      const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

      // Format room string and extracted room number
      let roomStr = 'Unassigned';
      let roomNumber = '101';
      let roomType = 'Standard';
      if (b.booking_items.length > 0 && b.booking_items[0].room) {
        const room = b.booking_items[0].room;
        roomNumber = room.room_number;
        roomType = room.room_type?.name?.replace(' Room', '') || 'Standard';
        roomStr = `${room.room_number} · ${roomType}`;
      }

      const checkInStr = b.check_in_date.toISOString().split('T')[0];
      const checkOutStr = b.check_out_date.toISOString().split('T')[0];

      return {
        id: b.booking_code,
        guestName: b.guest ? `${b.guest.first_name} ${b.guest.last_name}`.trim() : 'Unknown Guest',
        room: roomStr,
        roomNumber: roomNumber,
        roomType: roomType,
        checkIn: checkInStr,
        checkOut: checkOutStr,
        source: 'Website',
        status: uiStatus,
        payment: uiPayment,
        total: formatter.format(b.total_amount).replace('Rp', 'Rp ')
      };
    });
    
    res.json(formattedBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create Booking
app.post('/api/bookings', async (req, res) => {
  const { guestName, room, checkIn, checkOut, source, status, payment, total } = req.body;
  try {
    // 1. Create or find Guest
    const [firstName, ...lastNameParts] = (guestName || '').split(' ');
    const guest = await prisma.guest.create({
      data: {
        first_name: firstName || 'Guest',
        last_name: lastNameParts.join(' ') || '',
      }
    });

    // 2. Map status back to DB enum
    let dbStatus = 'pending';
    if (status === 'Confirmed') dbStatus = 'confirmed';
    if (status === 'Checked-in') dbStatus = 'checked_in';
    if (status === 'Checked-out') dbStatus = 'checked_out';

    // 3. Find or Create Room accurately
    const roomRecord = await getOrCreateRoom(room);

    // 4. Parse total
    const numericTotal = parseInt((total || '').toString().replace(/\D/g, '')) || 0;

    // 5. Create Booking
    const booking = await prisma.booking.create({
      data: {
        booking_code: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        guest_id: guest.id,
        check_in_date: new Date(checkIn),
        check_out_date: new Date(checkOut),
        status: dbStatus,
        total_amount: numericTotal,
        booking_items: {
          create: [{
            room_id: roomRecord.id,
            price_per_night: numericTotal
          }]
        },
        payments: {
          create: [{
            amount: numericTotal,
            payment_method: 'cash',
            status: payment === 'Paid' ? 'completed' : 'pending'
          }]
        }
      },
      include: { guest: true, booking_items: { include: { room: { include: { room_type: true } } } }, payments: true }
    });

    // Format response back exactly as the UI needs it so it can be appended immediately
    const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
    const rType = roomRecord.room_type?.name?.replace(' Room', '') || 'Standard';
    const roomStr = `${roomRecord.room_number} · ${rType}`;

    const newUIBooking = {
      id: booking.booking_code,
      guestName: guestName,
      room: roomStr,
      roomNumber: roomRecord.room_number,
      roomType: rType,
      checkIn: checkIn,
      checkOut: checkOut,
      source: source || 'Website',
      status: status,
      payment: payment,
      total: formatter.format(booking.total_amount).replace('Rp', 'Rp ')
    };

    res.json(newUIBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Guests
app.get('/api/guests', async (req, res) => {
  try {
    const guests = await prisma.guest.findMany({
      include: {
        bookings: {
          include: {
            booking_items: { include: { room: true } },
            payments: true
          }
        }
      }
    });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
});

// Update Booking
app.put('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { guestName, room, checkIn, checkOut, source, status, payment, total } = req.body;
  try {
    const existingBooking = await prisma.booking.findUnique({
      where: { booking_code: id },
      include: { guest: true, payments: true, booking_items: true }
    });

    if (!existingBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update Guest Name
    const [firstName, ...lastNameParts] = (guestName || '').split(' ');
    await prisma.guest.update({
      where: { id: existingBooking.guest_id },
      data: {
        first_name: firstName || 'Guest',
        last_name: lastNameParts.join(' ') || ''
      }
    });

    // Map status back to DB enum
    let dbStatus = 'pending';
    if (status === 'Confirmed') dbStatus = 'confirmed';
    if (status === 'Checked-in') dbStatus = 'checked_in';
    if (status === 'Checked-out') dbStatus = 'checked_out';

    // Parse total
    const numericTotal = parseInt((total || '').toString().replace(/\D/g, '')) || 0;

    // Update Room if provided
    let roomRecord = await getOrCreateRoom(room);
    if (existingBooking.booking_items[0]) {
      await prisma.bookingItem.update({
        where: { id: existingBooking.booking_items[0].id },
        data: { room_id: roomRecord.id, price_per_night: numericTotal }
      });
    }

    // Update Booking
    const updatedBooking = await prisma.booking.update({
      where: { booking_code: id },
      data: {
        check_in_date: new Date(checkIn),
        check_out_date: new Date(checkOut),
        status: dbStatus,
        total_amount: numericTotal,
      },
      include: { guest: true, booking_items: { include: { room: { include: { room_type: true } } } }, payments: true }
    });

    // Update Payment
    if (existingBooking.payments[0]) {
      await prisma.payment.update({
        where: { id: existingBooking.payments[0].id },
        data: {
          amount: numericTotal,
          status: payment === 'Paid' ? 'completed' : payment === 'Partial' ? 'pending' : 'failed'
        }
      });
    }

    // Format response back exactly as the UI needs it
    const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
    const rType = roomRecord.room_type?.name?.replace(' Room', '') || 'Standard';
    const roomStr = `${roomRecord.room_number} · ${rType}`;

    const newUIBooking = {
      id: updatedBooking.booking_code,
      guestName: guestName,
      room: roomStr,
      roomNumber: roomRecord.room_number,
      roomType: rType,
      checkIn: checkIn,
      checkOut: checkOut,
      source: source || 'Website',
      status: status,
      payment: payment,
      total: formatter.format(updatedBooking.total_amount).replace('Rp', 'Rp ')
    };

    res.json(newUIBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete Booking
app.delete('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({
      where: { booking_code: id }
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Profiles
app.get('/api/profiles/:auth_uid', async (req, res) => {
  const { auth_uid } = req.params;
  try {
    let profile = await prisma.profile.findUnique({
      where: { auth_uid }
    });

    if (!profile) {
      // Create default profile if not exists
      profile = await prisma.profile.create({
        data: {
          auth_uid,
          first_name: 'User',
          role: 'owner',
        }
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/profiles/:auth_uid', async (req, res) => {
  const { auth_uid } = req.params;
  const { phone, bio, language, timezone, first_name, last_name } = req.body;
  try {
    let profile = await prisma.profile.findUnique({
      where: { auth_uid }
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          auth_uid,
          first_name: first_name || 'User',
          last_name: last_name || '',
          phone,
          bio,
          language: language || 'en',
          timezone: timezone || 'Asia/Jakarta',
          role: 'owner'
        }
      });
    } else {
      profile = await prisma.profile.update({
        where: { auth_uid },
        data: {
          phone,
          bio,
          language,
          timezone,
          first_name: first_name || profile.first_name,
          last_name: last_name || profile.last_name
        }
      });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
