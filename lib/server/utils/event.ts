import { PrismaService } from '@/core/services/server'
import { CurrentDayState, Day, StudentDetails } from '@prisma/client'
import { isEqual } from 'lodash'
import { DateTime } from 'luxon'
import { databaseQueryWrapper } from '@/core/utils'

export function getCurrentDayCode() {
  return DateTime.now().toFormat('dd_LL_yyyy')
}

// Has to be run inside a databaseQueryWrapper wrapped method
export async function visitedAllDayStands(
  student: StudentDetails,
  scannedCompanyId: string
) {
  const studentScanned = new Set(student.companies_ids)

  // Already count with the next company
  studentScanned.add(scannedCompanyId)

  const day = await PrismaService.day.findUnique({
    where: {
      dateCode: getCurrentDayCode(),
    },
    select: {
      companies: {
        select: {
          userId: true,
        },
      },
    },
  })

  if (!day) return false

  return isEqual(
    studentScanned,
    new Set(day.companies.map((company) => company.userId))
  )
}
