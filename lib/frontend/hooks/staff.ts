import { User } from '@prisma/client'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  ActivityManagementDetails,
  AwardCreateData,
  AwardData,
  CompanyProfile,
  CreateAwardRequest,
  ManageEnrollmentRequest,
  StudentProfile,
  UpdateStudentPointsRequest,
  createAward,
  fetchActivityDetails,
  fetchUserDetails,
  fetchUsers,
  manageEnrollment,
  redeemAward,
  updateStudentPoints,
} from '../api'
import { AxiosError } from 'axios'

export const useUsersSearch = (search?: string) => {
  return useQuery({
    queryKey: ['Users', { query: search }],

    queryFn: () =>
      fetchUsers(search)
  });
}

export const useUserDetails = (uuid?: string) => {
  return useQuery({
    queryKey: ['User', { uuid }],
    queryFn: () => fetchUserDetails(uuid!),
    enabled: !!uuid
  });
}

export const useUpdateStudentPoints = (queryClient: QueryClient) => {
  return useMutation<void, AxiosError, UpdateStudentPointsRequest>({
    mutationFn: async (data) => updateStudentPoints(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['User', { uuid: variables.uuid }],
      })
    },
  })
}

export const useCreateAward = () => {
  return useMutation<AwardCreateData, AxiosError, CreateAwardRequest>({
    mutationFn: async (data) => createAward(data),
  })
}

export const useActivityManagementDetails = (id?: number) => {
  return useQuery({
    queryKey: ['ActivityManagementDetails', { id }],
    queryFn: () => fetchActivityDetails(id!),
    enabled: !!id
  });
}

export const useActivityEnrollmentManagement = (queryClient: QueryClient) => {
  return useMutation<void, AxiosError, ManageEnrollmentRequest>({
    mutationFn: async (data) => manageEnrollment(data),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({
        queryKey: ['ActivityManagementDetails', { id: variables.id }],
      }),
  })
}
