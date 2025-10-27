import { useSession } from '@/lib/frontend/utils/auth-client'
import {
  CompanyActivity,
  CompanyStudents,
  fetchCompanyActivities,
  fetchCompanyStudentsScans,
} from '../api'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@prisma/client'

export const useCompanyStudentsScans = (page?: number, search?: string) => {
  const session = useSession()
  const user = session.data?.user

  return useQuery({
    queryKey: ['CompanyStudents', { page: page, query: search }],
    queryFn: () => fetchCompanyStudentsScans(page, search),
    enabled:
      session.status === 'authenticated' && user?.role === UserType.Company
  });
}

export const useCompanyActivities = () => {
  return useQuery({
    queryKey: ['CompanyActivities'],
    queryFn: () => fetchCompanyActivities()
  });
}
