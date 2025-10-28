import { useQuery } from '@tanstack/react-query'
import {
  fetchInstituitonData,
  fetchCourseData,
  InstituitonData,
  CourseData,
} from '@/lib/frontend/api'

export const useInstitutions = () => {
  return useQuery<InstituitonData, Error>({
    queryKey: ['Institutions'],
    ...fetchInstituitonData
  });
}

export const useCourses = (instituitionCode?: string | null) => {
  return useQuery<CourseData | undefined, Error>({
    queryKey: ['Course', instituitionCode],
    queryFn: () => fetchCourseData(instituitionCode),
    enabled: !!instituitionCode
  });
}
