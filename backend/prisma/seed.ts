import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log({ admin })

  // Create sample parking
  const parking = await prisma.parking.upsert({
    where: { code: "P001" },
    update: {},
    create: {
      code: "P001",
      name: "Main Parking",
      location: "City Center",
      totalSlots: 100,
      availableSlots: 100,
      feePerHour: 2.5,
    },
  })

  console.log({ parking })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
