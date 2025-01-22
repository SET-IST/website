import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import {
  TextInput,
  Button,
  Paper,
  em,
  Text,
  Divider,
  rem,
  Textarea,
  CloseButton,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconLink } from '@tabler/icons-react'
import { ProfilePhotoEdit } from '../ProfilePhotoEdit'
import { useProfile, useUpdateProfile } from '@/lib/frontend/hooks'
import { CompanyProfile } from '@/lib/frontend/api'
import { FileWithPath } from '@mantine/dropzone'
import { useQueryClient } from '@tanstack/react-query'
import { useBoundStore } from '@/lib/frontend/store'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../Notifications'
import { useEffect } from 'react'

interface FormValues {
  name?: string
  description?: string
  profileImage?: FileWithPath
  linkHref?: string | null
  linkText?: string | null
}

const CompanySettingsForm = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  // Local state management
  const showSettings = useBoundStore((state) => state.showSettings)

  const { data: user } = useProfile()
  const company = user as CompanyProfile

  const schema = Yup.object().shape({
    name: Yup.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    description: Yup.string().max(
      500,
      'A descrição pode conter no máximo 500 caracteres'
    ),
    linkHref: Yup.string().url('URL inválido').nullable(),
    linkText: Yup.string().when([], {
      is: () => !!form.values.linkHref,
      then: (schema) =>
        schema
          .required('É necessário fornecer uma descrição do link')
          .max(40, 'A descrição pode conter no máximo 40 caracteres'),
      otherwise: (schema) => schema.nullable(),
    }),
  })

  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      name: company?.name,
      description: company?.companyDetails?.description,
      profileImage: undefined,
      linkHref: company?.companyDetails?.linkHref,
      linkText: company?.companyDetails?.linkText,
    },
  })

  const {
    mutateAsync: updateProfileData,
    isLoading,
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

    updatedValues = {
      ...updatedValues,
      linkHref:
        updatedValues.linkHref && updatedValues.linkHref.length == 0
          ? null
          : updatedValues.linkHref,
      linkText:
        updatedValues.linkText && updatedValues.linkText.length == 0
          ? null
          : updatedValues.linkText,
    }

    console.log(updatedValues)

    updateProfileData(updatedValues).then(() => {
      showSettings(false)
      showSuccessNotification({
        message: 'Perfil atualizado com sucesso',
      })
    })
  }

  const clearLink = () =>
    form.setValues({
      linkHref: '',
      linkText: '',
    })

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
        Editar perfil de empresa
      </Text>
      <form
        className="mt-4 flex flex-col gap-2"
        onSubmit={form.onSubmit(updateProfile)}
      >
        <ProfilePhotoEdit
          callback={(files) => form.setFieldValue('profileImage', files[0])}
          currentImage={company?.image}
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-stretch items-end">
          <TextInput
            withAsterisk
            className="w-full"
            label="Nome"
            {...form.getInputProps('name')}
          />
        </div>

        <Textarea
          label="Sobre"
          className="w-full"
          description="Descrição breve da empresa com um máximo de 500 caracteres"
          placeholder="Inserir descrição"
          {...form.getInputProps('description')}
        />

        <Divider label="Link externo" labelPosition="left" mt={12} />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
          <TextInput
            leftSection={
              <IconLink style={{ width: rem(16), height: rem(16) }} />
            }
            rightSection={
              !!form.values.linkHref && (
                <CloseButton aria-label="Clear input" onClick={clearLink} />
              )
            }
            description="URL"
            className="w-full"
            placeholder="https://"
            type="url"
            {...form.getInputProps('linkHref')}
          />
          <TextInput
            description="Descrição (Máximo de 30 caracteres)"
            placeholder="Conhecer as nossas oportunidades"
            className="w-full"
            {...form.getInputProps('linkText')}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6 sm:mt-4">
          <Button onClick={() => showSettings(false)} variant="default">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Paper>
  )
}

export { CompanySettingsForm }
