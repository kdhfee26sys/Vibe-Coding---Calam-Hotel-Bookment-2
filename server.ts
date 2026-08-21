import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const dbBookings = await prisma.booking.findMany({
      include: { guest: true, booking_items: { include: { room: { include: { room_type: true } } } }, payments: true },
      orderBy: { created_at: 'desc' }
    });
    
    // Map backend model to frontend UI format
    const formattedBookings = dbBookings.map(b => {
      // Map statuses
      let uiStatus = 'Pending';
      if (b.status === 'confirmed') uiStatus = 'Confirmed';
      if (b.status === 'checked_in') uiStatus = 'Checked-in';
      if (b.status === 'checked_out') uiStatus = 'Checked-out';
      
      let uiPayment = 'Unpaid';
      const payment = b.payments[0];
      if (payment) {
        if (payment.status === 'completed') uiPayment = 'Paid';
        if (payment.status === 'pending') uiPayment = 'Partial';
      }

      // Format total
      const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

      // Format room string
      let roomStr = 'Unassigned';
      if (b.booking_items.length > 0) {
        const room = b.booking_items[0].room;
        roomStr = `${room.room_number} · ${room.room_type?.name || 'Standard'}`;
      }

      return {
        id: b.booking_code,
        guestName: b.guest ? `${b.guest.first_name} ${b.guest.last_name}` : 'Unknown Guest',
        room: roomStr,
        checkIn: b.check_in_date.toISOString().split('T')[0],
        checkOut: b.check_out_date.toISOString().split('T')[0],
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

    // 3. Find Room (mock approach, get any room or find by name)
    const roomRecord = await prisma.room.findFirst({
      where: { room_number: room.split(' ')[0] }
    }) || await prisma.room.findFirst();

    // 4. Parse total
    const numericTotal = parseInt((total || '').replace(/\D/g, '')) || 0;

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
          create: roomRecord ? [{
            room_id: roomRecord.id,
            price_per_night: numericTotal
          }] : []
        },
        payments: {
          create: [{
            amount: numericTotal,
            payment_method: 'cash',
            status: payment === 'Paid' ? 'completed' : 'pending'
          }]
        }
      },
      include: { guest: true, booking_items: { include: { room: true } }, payments: true }
    });

    // Format response back exactly as the UI needs it so it can be appended immediately
    const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
    
    const newUIBooking = {
      id: booking.booking_code,
      guestName: guestName,
      room: room,
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
    const guests = await prisma.guest.findMany();
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
    let roomIdToUpdate = existingBooking.booking_items[0]?.room_id;
    if (room) {
      const roomRecord = await prisma.room.findFirst({
        where: { room_number: room.split(' ')[0] }
      });
      if (roomRecord) {
        roomIdToUpdate = roomRecord.id;
        if (existingBooking.booking_items[0]) {
          await prisma.bookingItem.update({
            where: { id: existingBooking.booking_items[0].id },
            data: { room_id: roomRecord.id, price_per_night: numericTotal }
          });
        }
      }
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
    
    let roomStr = 'Unassigned';
    if (updatedBooking.booking_items.length > 0) {
      const r = updatedBooking.booking_items[0].room;
      roomStr = `${r.room_number} · ${r.room_type?.name || 'Standard'}`;
    }

    const newUIBooking = {
      id: updatedBooking.booking_code,
      guestName: guestName,
      room: roomStr,
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

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
