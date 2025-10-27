import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  CompanyProfile,
  StudentProfile,
  StudentProfilePatchResponse,
  fetchCompanyProfile,
  fetchStudentProfile,
  updateCompanyProfile,
  updateStudentProfile,
} from '@/lib/frontend/api'

import { UserType } from '@prisma/client'
import { useSession } from '@/lib/frontend/utils/auth-client'
import { useEdgeStore } from '@/lib/frontend/edgestore'
import { IPatchStudentProfile } from '@/lib/server/services/student'
import { FileWithPath } from '@mantine/dropzone'
import { IPatchCompanyProfile } from '@/lib/server/services/company/dtos'

export const useProfile = () => {
  const session = useSession()
  const user = session.data?.user

  return useQuery<StudentProfile | CompanyProfile, Error>({
    queryKey: ['Profile'],
    queryFn: () => {
      return user?.role === UserType.Company
        ? fetchCompanyProfile()
        : fetchStudentProfile()
    },
    enabled: !!user,
    refetchInterval: (query) => {
      return !query.state.error ? 800 : false
    }
  });
}

export type PatchWithFiles<T> = T & {
  profileImage?: FileWithPath
  cv?: FileWithPath
}

export const useUpdateProfile = (queryClient: QueryClient) => {
  // Blob API
  const { edgestore } = useEdgeStore()

  const session = useSession()
  const user = session.data?.user

  return useMutation<
    StudentProfilePatchResponse,
    Error,
    PatchWithFiles<IPatchStudentProfile> | PatchWithFiles<IPatchCompanyProfile>
  >({
    mutationFn: async (
      data:
        | PatchWithFiles<IPatchStudentProfile>
        | PatchWithFiles<IPatchCompanyProfile>
    ) => {
      if (data.profileImage) {
        await edgestore.profileImages.upload({ file: data.profileImage })
      }

      if (data.cv && user?.role !== UserType.Company) {
        await edgestore.cvs.upload({
          file: data.cv,
          options: {
            manualFileName: data.cv.name,
          },
        })
      }

      const originalData = {
        ...data,
        profileImage: undefined,
        cv: undefined,
      }

      return user?.role === UserType.Company
        ? updateCompanyProfile(originalData)
        : updateStudentProfile(originalData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Profile'] })
    },
  })
}
