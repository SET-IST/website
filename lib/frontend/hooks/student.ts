import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  AwardToken,
  CompanyScan,
  ScannedCompany,
  UserEnrollment,
  fetchAward,
  fetchEnrolledActivities,
  fetchStudentCompaniesScans,
  scanCompany,
} from '../api'
import { AxiosError } from 'axios'
import { useBoundStore } from '@/lib/frontend/store'
import { databaseQueryWrapper } from '@/core/utils'


export const useStudentCompanyScans = () => {
  return useQuery<ScannedCompany[], AxiosError>(['StudentCompanyScans'], () =>
    fetchStudentCompaniesScans()
  )
}

export const useStudentEnrollments = () => {
  return useQuery<UserEnrollment[], AxiosError>(['StudentEnrollments'], () =>
    fetchEnrolledActivities()
  )
}

export const useScan = (queryClient: QueryClient) => {
  return useMutation<CompanyScan, AxiosError, string>({
    mutationFn: async (companyId: string) => {
      return scanCompany(companyId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Profile'],
      })
      queryClient.invalidateQueries({
        queryKey: ['StudentCompanyScans'],
      })
    },
  })
}

export const useAward = () => {
  const setAwardToken = useBoundStore((state) => state.setAwardToken)
  const lastToken = useBoundStore((state) => state.token)
  console.log("fetchAward...")

  return useQuery<AwardToken, AxiosError>({
    queryKey: ['Award'],
    queryFn: fetchAward,
    enabled: true,
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    refetchInterval: (data, query) => {
      return !query.state.error ? 800 : false
    },
    onSuccess: (data) => {
      setAwardToken(data?.id || '')
    },
    onError: (error) => {
      console.error("fetchAward error hooks: ", error)
    },
  })
}
