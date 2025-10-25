import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import {
  TextInput,
  Button,
  Paper,
  em,
  Text,
  Checkbox,
  Divider,
  FileInput,
  rem,
  Select,
  Anchor,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconFileCv } from '@tabler/icons-react'
import { ProfilePhotoEdit } from '../ProfilePhotoEdit'
import {
  useCourses,
  useInstitutions,
  useProfile,
  useUpdateProfile,
} from '@/lib/frontend/hooks'
import { StudentProfile } from '@/lib/frontend/api'
import { getInstitution } from '@/lib/frontend/utils'
import { useQueryClient } from '@tanstack/react-query'
import { use, useEffect, useState } from 'react'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../Notifications'
import { useBoundStore } from '@/lib/frontend/store'
import { FileWithPath } from '@mantine/dropzone'
import { isPhoneNumber } from 'class-validator'

interface FormValues {
  name?: string
  email?: string
  institutionCode?: string | null
  courseCode?: string | null
  profileImage?: FileWithPath
  cv?: File | null
  termsOfService: boolean
  phoneNumber?: string | null
}

const StudentSettingsForm = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  // Local state management
  const showSettings = useBoundStore((state) => state.showSettings)
  const showTermsAndConditions = useBoundStore(
    (state) => state.showTermsAndConditionsModal
  )

  // Queries

  const { data: user } = useProfile()
  const student = user as StudentProfile

  const schema = Yup.object().shape(
    {
      name: Yup.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
      email: Yup.string()
        .required('É necessário fornecer um endereço válido')
        .email('Endereço inválido'),
      courseCode: Yup.string().required('É necessário selecionar um curso'),
      termsOfService: Yup.boolean().when([], {
        is: () => form.isDirty('cv'),
        then: (schema) =>
          schema.isTrue('É necessário aceitar os termos e condições'),
      }),
      phoneNumber: Yup.string().when('phoneNumber', (val, schema) => {
        const value = val[0]
        if (value && value.length > 0) {
          return Yup.string().test(
            'phone',
            () => `Este contacto é inválido`,
            (value) => !!value && isPhoneNumber(value)
          )
        } else {
          return Yup.string().notRequired()
        }
      }),
    },
    [['phoneNumber', 'phoneNumber']]
  )

  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      name: student?.name ?? '',
      email: student?.email ?? '',
      institutionCode: student?.studentDetails?.university ?? '',
      courseCode: student?.studentDetails?.course ?? '',
      profileImage: undefined,
      cv: undefined,
      termsOfService: false,
      phoneNumber: student?.studentDetails?.phoneNumber ?? '',
    },
  })

  useEffect(() => {
    if (student) {
      form.initialize({
        name: student?.name ?? '',
        email: student?.email ?? '',
        institutionCode: student?.studentDetails?.university ?? '',
        courseCode: student?.studentDetails?.course ?? '',
        profileImage: undefined,
        cv: undefined,
        termsOfService: false,
        phoneNumber: student?.studentDetails?.phoneNumber ?? '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student])

  const { data: institutions } = useInstitutions()
  const { data: courses } = useCourses(form.values.institutionCode)

  const {
    mutateAsync: updateProfileData,
    isPending,
    isError,
    error,
  } = useUpdateProfile(useQueryClient())

  const updateProfile = (values: FormValues) => {
    let updatedValues: any = {}

    Object.keys(values).forEach((key) => {
      if (form.isDirty(key)) {
        updatedValues[key] = values[key as keyof FormValues]
      }
    })

    updateProfileData({
      ...updatedValues,
      termsOfService: undefined,
    }).then(() => {
      showSettings(false)
      showSuccessNotification({
        message: 'Perfil atualizado com sucesso',
      })
    })
  }

  useEffect(() => {
    if (isError) {
      showErrorNotification({
        title: `Ocorreu um erro, por favor tenta outra vez`,
        message: error.message,
      })
    }
  }, [isError, error])

  return (
    <Paper
      className="w-full h-fit !rounded-none sm:!rounded-lg"
      radius="md"
      withBorder={!isMobile}
      p={20}
      bg="var(--mantine-color-body)"
    >
      <Text c="#00415a" fz="xl" fw={700}>
        Editar perfil de estudante
      </Text>
      <form
        className="mt-4 flex flex-col gap-2"
        onSubmit={form.onSubmit(updateProfile)}
      >
        <ProfilePhotoEdit
          callback={(files) => form.setFieldValue('profileImage', files[0])}
          currentImage={student?.image}
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 justify-stretch">
          <TextInput
            withAsterisk
            className="w-full"
            label="Nome"
            {...form.getInputProps('name')}
          />

          <TextInput
            withAsterisk
            className="w-full"
            label="Email"
            {...form.getInputProps('email')}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 justify-stretch">
          <Select
            withAsterisk
            label="Universidade"
            className="w-full"
            placeholder="Procurar universidade"
            data={institutions?.map((course) => ({
              value: course.code,
              label: course.name,
            }))}
            value={form.values.institutionCode}
            defaultSearchValue={
              getInstitution(form.values.institutionCode)?.name
            }
            error={form.errors['institutionCode']}
            onChange={(value) => {
              form.setValues({
                institutionCode: value,
                courseCode: null,
              })
            }}
            searchable
          />

          <Select
            withAsterisk
            label="Curso"
            className="w-full"
            placeholder="Escolher curso"
            data={courses?.map((course) => ({
              value: course.code,
              label: course.name,
            }))}
            error={form.errors['courseCode']}
            value={form.values.courseCode}
            onChange={(value) => form.setFieldValue('courseCode', value)}
            allowDeselect={false}
          />
        </div>

        <Divider mt={12} />

        <TextInput
          className="w-full"
          label="Contacto"
          description="Vamos usar este número para contactar-te e confirmar as tuas inscrições nas atividades"
          inputMode="tel"
          placeholder="+351"
          {...form.getInputProps('phoneNumber')}
          onChange={(e) => {
            const value = e.target.value
            form.setFieldValue(
              'phoneNumber',
              value ? (value.includes('+') ? value : `+351 ${value}`) : ''
            )
          }}
        />

        <FileInput
          accept="application/pdf"
          onChange={(file) => form.setFieldValue('cv', file)}
          leftSection={
            <IconFileCv
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          label="Atualizar CV"
          description="O teu CV irá ser partilhado com as empresas a que deste scan ou durante as atividades (Speed Interviews)"
          placeholder={
            student?.cv && student.cv.metadata
              ? student.cv.metadata['originalfilename']
              : 'Faz upload do teu CV'
          }
          leftSectionPointerEvents="none"
        />

        <Checkbox
          mt="sm"
          disabled={!form.isDirty('cv')}
          label={
            <>
              Aceito os{' '}
              <Anchor
                component="button"
                onClick={(e) => {
                  e.preventDefault()
                  showTermsAndConditions(true)
                }}
                inherit
              >
                termos e condições
              </Anchor>{' '}
              da plataforma de CVs
            </>
          }
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6 sm:mt-4">
          <Button onClick={() => showSettings(false)} variant="default">
            Cancelar
          </Button>
          <Button loading={isPending} type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export { StudentSettingsForm }
