import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { Button, NumberInput, Text } from '@mantine/core'
import { AccountSelect } from './components'
import { UserType } from '@prisma/client'
import { useEffect } from 'react'
import { useUpdateStudentPoints, useUserDetails } from '@/lib/frontend/hooks'
import { fetchRedemptionSettings, RedemptionSettings, StudentProfile } from '@/lib/frontend/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../Notifications'

interface FormValues {
  uuid?: string
  points?: number
}

const PointsManagementForm = () => {
  const schema = Yup.object().shape({
    uuid: Yup.string()
      .uuid('UUID inválido')
      .required('É necessário fornecer um UUID válido'),
    points: Yup.number()
      .integer('O número de pontos tem de ser inteiro')
      .min(0, 'O número de pontos tem de ser positivo')
      .max(1000, 'Valor máximo de pontos: 1000'),
  })

  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      uuid: undefined,
      points: 0,
    },
  })

  const { data: userDetails } = useUserDetails(form.values.uuid)

  const isValidUser = !!userDetails && userDetails.role !== UserType.Company

  const { mutateAsync: updatePoints, isPending } = useUpdateStudentPoints(
    useQueryClient()
  )

  useEffect(() => {
    !!userDetails &&
      form.setFieldValue(
        'points',
        (userDetails as StudentProfile)?.studentDetails?.points
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

  const addPoints = (points: number) => {
    const val = !form.values.points ? points : form.values.points + points
    form.setFieldValue('points', val)
  }

  const updateStudentPoints = (values: FormValues) => {
    if (!values.uuid || (!values.points && values.points != 0)) return

    updatePoints({
      uuid: values.uuid,
      points: values.points,
    })
      .then(() => {
        showSuccessNotification({
          message: 'Pontos atualizados',
        })
      })
      .catch((error) => {
        showErrorNotification({
          title: `Ocorreu um erro, por favor tenta outra vez`,
          message: error.message,
        })
      })
  }

  const redemptionSettings = useQuery({
    queryKey: ['redemptionSettings'],
    queryFn: () => fetchRedemptionSettings()
  })

  return (
    <div className="h-fit p-4">
      <Text c="#00415a" fz="xl" fw={700}>
        STAFF - Gestão de pontos
      </Text>
      <form
        onSubmit={form.onSubmit(updateStudentPoints)}
        className="mt-4 flex flex-col gap-2"
      >
        <AccountSelect
          callback={(userData) => form.setFieldValue('uuid', userData.id)}
          errors={form.errors}
        />

        <NumberInput
          required
          disabled={!isValidUser}
          label="Pontuação atual"
          {...form.getInputProps('points')}
          allowNegative={false}
        />
        <Button.Group orientation="vertical">
          <Button
            disabled={!isValidUser}
            onClick={() => addPoints(redemptionSettings.data?.REWARD ?? 10)}
            fullWidth
            variant="default"
          >
            Scan a empresa (+{redemptionSettings.data?.REWARD ?? 10})
          </Button>
          <Button
            disabled={!isValidUser}
            onClick={() => addPoints(redemptionSettings.data?.LECTURE ?? 20)}
            fullWidth
            variant="default"
          >
            Palestra (+{redemptionSettings.data?.LECTURE ?? 20})
          </Button>
          <Button
            disabled={!isValidUser}
            onClick={() =>
              addPoints(redemptionSettings.data?.SPEED_INTERVIEW ?? 30)
            }
            fullWidth
            variant="default"
          >
            Speed Interview (+{redemptionSettings.data?.SPEED_INTERVIEW ?? 30})
          </Button>
          <Button
            disabled={!isValidUser}
            onClick={() => addPoints(redemptionSettings.data?.WORKSHOP ?? 40)}
            fullWidth
            variant="default"
          >
            Workshop (+{redemptionSettings.data?.WORKSHOP ?? 40})
          </Button>
          <Button
            disabled={!isValidUser}
            onClick={() => addPoints(50)}
            fullWidth
            variant="default"
          >
            Todas as bancas do dia (+50)
          </Button>
          <Button
            disabled={!isValidUser}
            onClick={() => {
              form.setFieldValue(
                'points',
                (userDetails as StudentProfile)?.studentDetails?.points
              )
            }}
            fullWidth
            variant="default"
          >
            Repor
          </Button>
        </Button.Group>

        <div className="flex flex-col sm:flex-row  gap-3 mt-6 sm:mt-4">
          <Button disabled={!isValidUser} loading={isPending} type="submit">
            Aplicar
          </Button>
        </div>
      </form>
    </div>
  )
}

export { PointsManagementForm }
