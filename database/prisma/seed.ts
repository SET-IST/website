// database/prisma/seed.ts

import { PrismaClient, ActivityType, CompanyCategory, CurrentDayState } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1️⃣ Create a Day
  const day = await prisma.day.create({
    data: {
      date: new Date(),
      dateCode: 'DAY1-2025',
      state: CurrentDayState.Active,
    },
  })

  // 2️⃣ Create a Company User with CompanyDetails
  const companyUser = await prisma.user.create({
    data: {
      name: 'TechCorp',
      email: 'contact@techcorp.com',
      role: 'Company',
      companyDetails: {
        create: {
          category: CompanyCategory.Gold,
          description: 'A tech company attending SET.',
          linkHref: 'https://techcorp.com',
          linkText: 'Visit us',
          days: { connect: [{ id: day.id }] },
        },
      },
    },
    include: { companyDetails: true },
  })

  // 3️⃣ Create an Activity linked to that company and day
  const activity = await prisma.activity.create({
    data: {
      idHash: crypto.randomUUID(),
      title: 'Building with Prisma',
      description: 'Workshop on using Prisma with Next.js',
      date: new Date(),
      duration: 90,
      location: 'Room A',
      validated: true,
      type: ActivityType.Workshop,
      points: 20,
      day: { connect: { id: day.id } },
      companies: { connect: [{ id: companyUser.companyDetails!.id }] },
    },
  })

  // 4️⃣ Create a Student User
  const studentUser = await prisma.user.create({
    data: {
      name: 'Alice Student',
      email: 'alice@student.com',
      role: 'Student',
      studentDetails: {
        create: {
          course: 'Computer Engineering',
          university: 'IST',
          companies_ids: [],
        },
      },
    },
  })

  // 5️⃣ Log an Event (Activity Enrollment)
  await prisma.eventLog.create({
    data: {
      type: 'ENROLLMENTS',
      description: 'Alice enrolled in Building with Prisma',
      actorId: studentUser.id,
      targetId: companyUser.id,
      activityId: activity.id,
    },
  })

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
