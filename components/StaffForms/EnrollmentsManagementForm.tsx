import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Group,
  Popover,
  Select,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { AccountSelect } from './components'
import { UserType } from '@prisma/client'
import {
  useActivityEnrollmentManagement,
  useActivityManagementDetails,
  useUserDetails,
} from '@/lib/frontend/hooks'
import { EnrollmentManagementAction, StudentProfile } from '@/lib/frontend/api'
import { useQueryClient } from '@tanstack/react-query'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../Notifications'
import { ActivitySelect } from './components/ActivitySelect'
import { useState } from 'react'

interface FormValues {
  id?: number
  uuid?: string
}

const EnrollmentsManagementForm = () => {
  const form = useForm<FormValues>({
    validate: yupResolver(
      Yup.object().shape({
        id: Yup.number().positive('ID de atividade inválido'),
        uuid: Yup.string()
          .uuid('UUID inválido')
          .required('É necessário fornecer um UUID válido'),
      })
    ),
    initialValues: {
      id: undefined,
      uuid: undefined,
    },
  })

  const { data: activityManagementData } = useActivityManagementDetails(
    form.values.id
  )

  const { data: userDetails } = useUserDetails(form.values.uuid)

  const isValidUser = !!userDetails && userDetails.role !== UserType.Company

  const { mutateAsync: updateEnrollment, isPending } =
    useActivityEnrollmentManagement(useQueryClient())

  const updateEnrollmentData = (
    values: FormValues & { action: EnrollmentManagementAction }
  ) => {
    if (!values.uuid || !values.id || !values.action) return

    updateEnrollment({
      id: values.id,
      userId: values.uuid,
      action: values.action,
    })
      .then(() => {
        form.setFieldValue('uuid', undefined)
        showSuccessNotification({
          message: 'Inscrições atualizadas',
        })
      })
      .catch((error) => {
        showErrorNotification({
          title: `Ocorreu um erro, por favor tenta outra vez`,
          message: error.message,
        })
      })
  }

  return (
    <div className="h-fit p-4">
      <Text c="#00415a" fz="xl" fw={700}>
        STAFF - Gestão de inscrições
      </Text>
      <ActivitySelect
        callback={(activity) => form.setFieldValue('id', activity?.id)}
      />
      {activityManagementData && (
        <>
          <Divider
            my="md"
            label={
              <Text c="gray" fz="xs" fw={700}>
                Estudantes
              </Text>
            }
            labelPosition="left"
          />
          <div className="max-h-40 h-fit flex flex-col gap-4 items-center overflow-y-auto">
            {activityManagementData.enrollments.map((enrollment, index) => (
              <Popover
                key={`enrollment_${index}`}
                width={300}
                position="bottom"
                shadow="md"
              >
                <Popover.Target>
                  <UnstyledButton
                    p="sm"
                    className="hover:bg-gray-50 rounded-md"
                  >
                    <Group wrap="nowrap">
                      <Avatar src={enrollment.student.user.image} radius="xl" />
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {enrollment.student.user.name}
                        </Text>

                        <Text c="dimmed" size="xs">
                          {enrollment.student.user.email}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {enrollment.student.phoneNumber}
                        </Text>
                        {enrollment.confirmed && (
                          <Badge size="sm">CONFIRMADO</Badge>
                        )}
                      </div>
                    </Group>
                  </UnstyledButton>
                </Popover.Target>
                <Popover.Dropdown>
                  <Select
                    placeholder="Ação"
                    data={[
                      {
                        label: 'Confirmar',
                        value: EnrollmentManagementAction.CONFIRM,
                      },
                      {
                        label: 'Cancelar confirmação',
                        value: EnrollmentManagementAction.ENROLL,
                      },
                      {
                        label: 'Desinscrever',
                        value: EnrollmentManagementAction.DISCARD,
                      },
                    ]}
                    onChange={(action) =>
                      updateEnrollmentData({
                        id: form.values.id,
                        uuid: enrollment.userId,
                        action: action as EnrollmentManagementAction,
                      })
                    }
                    comboboxProps={{ withinPortal: false }}
                  />
                </Popover.Dropdown>
              </Popover>
            ))}
            {activityManagementData.enrollments.length === 0 && (
              <Text c="gray" fz="sm" fw={500}>
                Sem inscrições
              </Text>
            )}
          </div>
          <Divider
            my="md"
            label={
              <Text c="gray" fz="xs" fw={700}>
                Inscrever estudante
              </Text>
            }
            labelPosition="left"
          />
          <form
            onSubmit={form.onSubmit((values) =>
              updateEnrollmentData({
                ...values,
                action: EnrollmentManagementAction.ENROLL,
              })
            )}
            className="mt-4 flex flex-col gap-2"
          >
            <AccountSelect
              callback={(userData) => {
                form.setFieldValue('uuid', userData.id)
              }}
              errors={form.errors}
            />

            <div className="flex flex-col sm:flex-row  gap-3 mt-6 sm:mt-4">
              <Button disabled={!isValidUser} loading={isPending} type="submit">
                Adicionar inscrição
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export { EnrollmentsManagementForm }
