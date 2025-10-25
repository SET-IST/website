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


export const useStudentCompanyScans = () => {
  return useQuery({
    queryKey: ['StudentCompanyScans'],

    queryFn: () =>
      fetchStudentCompaniesScans()
  });
}

export const useStudentEnrollments = () => {
  return useQuery({
    queryKey: ['StudentEnrollments'],

    queryFn: () =>
      fetchEnrolledActivities()
  });
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
  return useQuery<AwardToken, AxiosError>({
    queryKey: ['Award'],
    queryFn: fetchAward,
    enabled: true,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    refetchInterval: (query) => {
      return !query.state.error ? 800 : false
    },
  });
}
