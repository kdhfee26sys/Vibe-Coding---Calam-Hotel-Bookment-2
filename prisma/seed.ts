import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const standardType = await prisma.roomType.create({
    data: {
      name: 'Standard Room',
      description: 'A cozy room for two',
      base_price: 500000.0,
      capacity: 2,
      amenities: JSON.stringify(["wifi", "tv", "air_conditioning"]),
    },
  })

  const deluxeType = await prisma.roomType.create({
    data: {
      name: 'Deluxe Room',
      description: 'Spacious room with a city view',
      base_price: 850000.0,
      capacity: 2,
      amenities: JSON.stringify(["wifi", "tv", "air_conditioning", "minibar", "city_view"]),
    },
  })

  const suiteType = await prisma.roomType.create({
    data: {
      name: 'Suite Room',
      description: 'Luxury suite with living room and bathtub',
      base_price: 1500000.0,
      capacity: 4,
      amenities: JSON.stringify(["wifi", "tv", "air_conditioning", "minibar", "living_room", "bathtub"]),
    },
  })

  // Standard Rooms
  await prisma.room.create({ data: { room_number: '101', room_type_id: standardType.id, status: 'available', floor: '1' } });
  await prisma.room.create({ data: { room_number: '102', room_type_id: standardType.id, status: 'available', floor: '1' } });
  await prisma.room.create({ data: { room_number: '105', room_type_id: standardType.id, status: 'available', floor: '1' } });

  // Deluxe Rooms
  await prisma.room.create({ data: { room_number: '201', room_type_id: deluxeType.id, status: 'occupied', floor: '2' } });
  await prisma.room.create({ data: { room_number: '203', room_type_id: deluxeType.id, status: 'available', floor: '2' } });
  await prisma.room.create({ data: { room_number: '204', room_type_id: deluxeType.id, status: 'available', floor: '2' } });
  await prisma.room.create({ data: { room_number: '205', room_type_id: deluxeType.id, status: 'available', floor: '2' } });

  // Suite Rooms
  await prisma.room.create({ data: { room_number: '301', room_type_id: suiteType.id, status: 'available', floor: '3' } });
  await prisma.room.create({ data: { room_number: '302', room_type_id: suiteType.id, status: 'available', floor: '3' } });
  await prisma.room.create({ data: { room_number: '305', room_type_id: suiteType.id, status: 'available', floor: '3' } });

  const guest = await prisma.guest.create({
    data: {
      first_name: 'Johan',
      last_name: 'Cruyff',
      email: 'johan@example.com',
      phone: '08123456789',
      identity_number: 'ID123456789',
    },
  })

  const room201 = await prisma.room.findUnique({ where: { room_number: '201' } });

  const booking = await prisma.booking.create({
    data: {
      booking_code: 'BK-5720',
      guest_id: guest.id,
      check_in_date: new Date('2026-08-21T00:00:00.000Z'),
      check_out_date: new Date('2026-08-25T00:00:00.000Z'),
      status: 'confirmed',
      total_amount: 3500000.0,
      booking_items: {
        create: [{
          room_id: room201 ? room201.id : '',
          price_per_night: 850000.0,
        }]
      },
      payments: {
        create: [{
          amount: 3500000.0,
          payment_method: 'credit_card',
          status: 'completed',
        }]
      }
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
