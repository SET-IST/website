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
    // cacheTime: Infinity,
    // staleTime: Infinity,
    refetchOnWindowFocus: true, // FIXME the page refetchs on window focus, even with false (the qrcode changes after redeem without the whell, if the user has the redeem modal open)
    refetchInterval: (data, query) => {
      return !query.state.error ? 800 : false
    },
    // retry: false, // ⬅️ Only retry twice before stopping
    // retryDelay: (attempt) => Math.min(1000 * 5 ** attempt, 30000), // Exponential backoff
    //retry: (failureCount, error) => false,
    onSuccess: (data) => {
      // if (lastToken === data?.id) {
      //   console.log("same token recieved from api")
      // } else {
      //   console.log("different token recieved from api")
      // }
      console.log("fetchAward data hooks: ", data)
      setAwardToken(data?.id || '')
    },
    onError: (error) => {
      console.error("fetchAward error hooks: ", error)
      // Handle error state here if needed
    },
    // retry: (failureCount, err) => {
    //   if (err.response?.status === 400) {
    //     console.log('This works')
    //     return true; // do not retry, trigger error
    //   }
    //   return true; // retry for other errors
    // },
  })
}


// const setAwardToken = useBoundStore((state) => state.setAwardToken)

// useEffect(() => {
//   fetchAward().then(setAwardToken)
// }, [])
