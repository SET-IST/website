/**
 * Fake-data seed for LOCAL DEVELOPMENT ONLY.
 *
 * Run:   yarn prisma db seed
 *
 * Optional: turn YOUR OWN account (already logged in once) into a company/staff/student:
 *   SEED_LOGIN_EMAIL=you@example.com yarn prisma db seed
 *   SEED_LOGIN_EMAIL=you@example.com SEED_LOGIN_ROLE=Staff yarn prisma db seed
 *   (SEED_LOGIN_ROLE: Company (default) | Staff | Student)
 *
 * Safe to re-run: everything is an upsert. Refuses to run on a non-local
 * database unless SEED_FORCE=1 (don't).
 *
 * The seeded users can NOT log in (login is Google/Fénix OAuth). They only
 * exist to give the app realistic data to show.
 */
import {
  PrismaClient,
  UserType,
  CompanyCategory,
  ActivityType,
  AwardType,
  CurrentDayState,
  PointSetting,
  EventLogType,
} from '@prisma/client'

const prisma = new PrismaClient()

// ---------------------------------------------------------------------------
// Things you may need to adjust to match the real app
// ---------------------------------------------------------------------------

// Format of Day.dateCode. Check how the app builds/reads it:
//   grep -rn "dateCode" pages core lib _pages --include=*.ts --include=*.tsx
const dateCodeFor = (d: Date): string => d.toISOString().slice(0, 10)

// Guesses: check how the app uses RedemptionSettings and adjust if needed.
const POINT_SETTINGS: Record<PointSetting, number> = {
  REDEEM: 100,
  RATIO: 1,
  REWARD: 10,
  LECTURE: 20,
  WORKSHOP: 30,
  SPEED_INTERVIEW: 15,
}

const EMAIL_DOMAIN = 'seed.local'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertLocalDatabase(): void {
  const rawUrl = process.env.DATABASE_URL ?? ''
  let host = process.env.DATABASE_HOST ?? ''
  if (!host) {
    try {
      host = new URL(rawUrl).hostname
    } catch {
      host = ''
    }
  }

  if (!host) {
    console.warn('Could not determine the database host, continuing anyway.')
    return
  }

  const isLocal = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(host)
  if (!isLocal && process.env.SEED_FORCE !== '1') {
    throw new Error(
      `Refusing to seed a non-local database (host: "${host}"). ` +
        'This script is for local development only.'
    )
  }
}

function pick<T>(arr: T[], index: number): T {
  const value = arr[index]
  if (value === undefined) {
    throw new Error(`Seed data error: no item at index ${index}`)
  }
  return value
}

const isUserType = (v: string): v is UserType =>
  (Object.values(UserType) as string[]).includes(v)

async function upsertUser(name: string, email: string, role: UserType) {
  return prisma.user.upsert({
    where: { email },
    update: { name, role },
    create: { name, email, role, emailVerified: true },
  })
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function main() {
  assertLocalDatabase()
  console.log('Seeding local database...')

  // 1. Point settings -------------------------------------------------------
  for (const [setting, amount] of Object.entries(POINT_SETTINGS) as [
    PointSetting,
    number,
  ][]) {
    await prisma.redemptionSettings.upsert({
      where: { setting },
      update: { amount },
      create: { setting, amount },
    })
  }

  // 2. Days: today, +1, +2 (today is the Active one) ----------------------
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const days: { id: number; date: Date }[] = []
  for (let i = 0; i < 3; i++) {
    const date = new Date(today)
    date.setUTCDate(today.getUTCDate() + i)
    const state = i === 0 ? CurrentDayState.Active : CurrentDayState.Inactive
    const day = await prisma.day.upsert({
      where: { dateCode: dateCodeFor(date) },
      update: { date, state },
      create: { dateCode: dateCodeFor(date), date, state },
    })
    days.push(day)
  }
  const dayConnect = days.map((d) => ({ id: d.id }))

  // 3. Staff ---------------------------------------------------------------
  const staff = await upsertUser(
    'Demo Staff',
    `staff@${EMAIL_DOMAIN}`,
    UserType.Staff
  )

  // 4. Companies -----------------------------------------------------------
  const companyDefs = [
    {
      name: 'Acme Robotics',
      slug: 'acme',
      category: CompanyCategory.Platinum,
      description:
        'Acme Robotics builds autonomous warehouse robots. Fake company for local development.',
      linkHref: 'https://example.com/acme',
      linkText: 'Visit Acme',
    },
    {
      name: 'Globex Software',
      slug: 'globex',
      category: CompanyCategory.Gold,
      description:
        'Globex Software develops cloud tools for engineering teams. Fake company for local development.',
      linkHref: 'https://example.com/globex',
      linkText: 'Visit Globex',
    },
    {
      name: 'Initech Consulting',
      slug: 'initech',
      category: CompanyCategory.Silver,
      description:
        'Initech Consulting helps companies modernise their systems. Fake company for local development.',
      linkHref: 'https://example.com/initech',
      linkText: 'Visit Initech',
    },
  ]

  const companies: { id: number }[] = []
  for (const c of companyDefs) {
    const user = await upsertUser(
      c.name,
      `${c.slug}@${EMAIL_DOMAIN}`,
      UserType.Company
    )
    const company = await prisma.companyDetails.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        category: c.category,
        description: c.description,
        linkHref: c.linkHref,
        linkText: c.linkText,
        days: { connect: dayConnect },
      },
    })
    companies.push(company)
  }

  // 5. Students ------------------------------------------------------------
  const studentDefs = [
    { name: 'Ana Silva', slug: 'ana', course: 'LEIC', points: 120 },
    { name: 'Bruno Costa', slug: 'bruno', course: 'LEIC', points: 80 },
    { name: 'Carla Mendes', slug: 'carla', course: 'LEEC', points: 45 },
    { name: 'Diogo Ramos', slug: 'diogo', course: 'LEGI', points: 10 },
    { name: 'Eva Santos', slug: 'eva', course: 'LEFT', points: 0 },
  ]

  const students: { id: number; userId: string; points: number }[] = []
  for (const s of studentDefs) {
    const user = await upsertUser(
      s.name,
      `${s.slug}@${EMAIL_DOMAIN}`,
      UserType.Student
    )
    const details = await prisma.studentDetails.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        course: s.course,
        university: 'Instituto Superior Técnico',
        points: s.points,
      },
    })
    students.push({ id: details.id, userId: details.userId, points: s.points })
  }

  // 6. Activities ----------------------------------------------------------
  // dayIndex: 0..2, hour: UTC hour of the start time,
  // duration: assumed to be in minutes
  const activityDefs = [
    {
      key: 'lecture-1',
      title: 'The Future of Warehouse Automation',
      description: 'A talk about robots in logistics.',
      dayIndex: 0,
      hour: 10,
      duration: 45,
      location: 'Room 1.01',
      points: 20,
      type: ActivityType.Lecture,
      companyIndexes: [0],
    },
    {
      key: 'workshop-1',
      title: 'Build a Cloud App in 60 Minutes',
      description: 'Hands-on workshop. Bring your laptop.',
      dayIndex: 0,
      hour: 14,
      duration: 60,
      location: 'Lab 2',
      points: 30,
      type: ActivityType.Workshop,
      companyIndexes: [1],
    },
    {
      key: 'speed-1',
      title: 'Speed Interviews: Round 1',
      description: 'Short interviews with several companies.',
      dayIndex: 1,
      hour: 11,
      duration: 120,
      location: 'Main Hall',
      points: 15,
      type: ActivityType.SpeedInterview,
      companyIndexes: [0, 1, 2],
    },
    {
      key: 'lecture-2',
      title: 'Consulting 101',
      description: 'What consultants actually do all day.',
      dayIndex: 1,
      hour: 15,
      duration: 45,
      location: 'Room 1.02',
      points: 20,
      type: ActivityType.Lecture,
      companyIndexes: [2],
    },
    {
      key: 'workshop-2',
      title: 'CV Clinic',
      description: 'Get your CV reviewed by recruiters.',
      dayIndex: 2,
      hour: 10,
      duration: 90,
      location: 'Lab 1',
      points: 30,
      type: ActivityType.Workshop,
      companyIndexes: [1, 2],
    },
    {
      key: 'speed-2',
      title: 'Speed Interviews: Round 2',
      description: 'Second round of short interviews.',
      dayIndex: 2,
      hour: 14,
      duration: 120,
      location: 'Main Hall',
      points: 15,
      type: ActivityType.SpeedInterview,
      companyIndexes: [0, 2],
    },
  ]

  const activities: { id: number }[] = []
  for (const a of activityDefs) {
    const day = pick(days, a.dayIndex)
    const start = new Date(day.date)
    start.setUTCHours(a.hour, 0, 0, 0)
    const idHash = `seed-${a.key}`

    const activity = await prisma.activity.upsert({
      where: { idHash },
      update: {},
      create: {
        idHash,
        title: a.title,
        description: a.description,
        date: start,
        dayId: day.id,
        duration: a.duration,
        location: a.location,
        points: a.points,
        validated: false,
        type: a.type,
        companies: {
          connect: a.companyIndexes.map((i) => ({ id: pick(companies, i).id })),
        },
      },
    })
    activities.push(activity)
  }

  // 7. Enrollments (student index, activity index, confirmed) --------------
  const enrollments = [
    [0, 0, true],
    [0, 1, false],
    [1, 0, true],
    [2, 2, true],
    [3, 3, false],
  ] as const

  for (const [si, ai, confirmed] of enrollments) {
    const student = pick(students, si)
    const activity = pick(activities, ai)
    await prisma.activityEnrollment.upsert({
      where: {
        enrollmentId: { userId: student.userId, activityId: activity.id },
      },
      update: { confirmed },
      create: { userId: student.userId, activityId: activity.id, confirmed },
    })
  }

  // 8. Points per day (first day) -----------------------------------------
  const firstDay = pick(days, 0)
  for (const student of students) {
    await prisma.dayTotalPoints.upsert({
      where: {
        dayId_studentDetailsId: {
          dayId: firstDay.id,
          studentDetailsId: student.id,
        },
      },
      update: { total_points: student.points },
      create: {
        dayId: firstDay.id,
        studentDetailsId: student.id,
        total_points: student.points,
      },
    })
  }

  // 9. Awards (prizes) -----------------------------------------------------
  const awardDefs = [
    { name: 'Sticker pack', amountAvailable: 50, type: AwardType.NORMAL },
    { name: 'Tote bag', amountAvailable: 25, type: AwardType.NORMAL },
    { name: 'Water bottle', amountAvailable: 10, type: AwardType.NORMAL },
    { name: 'Wireless headphones', amountAvailable: 3, type: AwardType.SPECIAL },
  ]

  for (const a of awardDefs) {
    const existing = await prisma.award.findFirst({ where: { name: a.name } })
    if (existing) {
      await prisma.award.update({
        where: { id: existing.id },
        data: { amountAvailable: a.amountAvailable, type: a.type },
      })
    } else {
      await prisma.award.create({ data: { ...a, active: true } })
    }
  }

  // 10. Event log (recreated on every run) ----------------------------------
  await prisma.eventLog.deleteMany({
    where: { description: { startsWith: '[seed]' } },
  })
  await prisma.eventLog.createMany({
    data: [
      {
        type: EventLogType.POINTS,
        description: '[seed] Added 20 points',
        actorId: staff.id,
        targetId: pick(students, 0).userId,
      },
      {
        type: EventLogType.ENROLLMENTS,
        description: '[seed] Confirmed enrollment',
        actorId: staff.id,
        targetId: pick(students, 1).userId,
        activityId: pick(activities, 0).id,
      },
    ],
  })

  // 11. Optionally turn the developer's own account into a company/staff/student
  await promoteLoginUser(dayConnect, activities)

  console.log('Done.')
  console.log(
    `Created: ${companies.length} companies, ${students.length} students, ` +
      `${days.length} days, ${activities.length} activities.`
  )
}

async function promoteLoginUser(
  dayConnect: { id: number }[],
  activities: { id: number }[]
) {
  const email = process.env.SEED_LOGIN_EMAIL
  if (!email) {
    console.log(
      'Tip: log in once with your real account, then run\n' +
        '  SEED_LOGIN_EMAIL=<your email> yarn prisma db seed\n' +
        'to turn it into a company (or SEED_LOGIN_ROLE=Staff|Student).'
    )
    return
  }

  const roleInput = process.env.SEED_LOGIN_ROLE ?? 'Company'
  if (!isUserType(roleInput)) {
    throw new Error(
      `Invalid SEED_LOGIN_ROLE "${roleInput}". Use Company, Staff or Student.`
    )
  }
  const role: UserType = roleInput

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.log(
      `No user with email ${email}. Log in once with that account, then run the seed again.`
    )
    return
  }

  // A user shouldn't be a company/staff AND have a student profile
  if (role !== UserType.Student) {
    try {
      await prisma.studentDetails.deleteMany({ where: { userId: user.id } })
    } catch {
      console.warn(
        'Could not delete the existing student profile (it has related data). Remove it in Prisma Studio.'
      )
    }
  }

  await prisma.user.update({ where: { id: user.id }, data: { role } })

  if (role === UserType.Company) {
    const activityConnect = activities.slice(0, 2).map((a) => ({ id: a.id }))
    await prisma.companyDetails.upsert({
      where: { userId: user.id },
      update: {
        days: { set: dayConnect },
        activities: { set: activityConnect },
      },
      create: {
        userId: user.id,
        category: CompanyCategory.Gold,
        description: 'Demo company for the onboarding session.',
        linkHref: 'https://example.com',
        linkText: 'Visit us',
        days: { connect: dayConnect },
        activities: { connect: activityConnect },
      },
    })
  }

  if (role === UserType.Student) {
    await prisma.studentDetails.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        course: 'LEIC',
        university: 'Instituto Superior Técnico',
        points: 0,
      },
    })
  }

  console.log(
    `${email} is now: ${role}. Log out and log back in (or delete your Session rows in Prisma Studio).`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })