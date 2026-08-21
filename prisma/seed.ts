import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const roomType1 = await prisma.roomType.create({
    data: {
      name: 'Standard Room',
      description: 'A cozy room for two',
      base_price: 500000.0,
      capacity: 2,
      amenities: JSON.stringify(["wifi", "tv", "air_conditioning"]),
    },
  })

  const roomType2 = await prisma.roomType.create({
    data: {
      name: 'Deluxe Room',
      description: 'Spacious room with a city view',
      base_price: 850000.0,
      capacity: 2,
      amenities: JSON.stringify(["wifi", "tv", "air_conditioning", "minibar", "city_view"]),
    },
  })

  const room1 = await prisma.room.create({
    data: {
      room_number: '101',
      room_type_id: roomType1.id,
      status: 'available',
      floor: '1',
    },
  })

  const room2 = await prisma.room.create({
    data: {
      room_number: '201',
      room_type_id: roomType2.id,
      status: 'occupied',
      floor: '2',
    },
  })

  const guest = await prisma.guest.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '08123456789',
      identity_number: 'ID123456789',
    },
  })

  const booking = await prisma.booking.create({
    data: {
      booking_code: 'BKG-001',
      guest_id: guest.id,
      check_in_date: new Date('2026-08-20T00:00:00.000Z'),
      check_out_date: new Date('2026-08-25T00:00:00.000Z'),
      status: 'checked_in',
      total_amount: 1700000.0,
    },
  })

  await prisma.bookingItem.create({
    data: {
      booking_id: booking.id,
      room_id: room2.id,
      price_per_night: 850000.0,
    },
  })

  await prisma.payment.create({
    data: {
      booking_id: booking.id,
      amount: 1700000.0,
      payment_method: 'credit_card',
      status: 'completed',
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
