import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Group,
  Button,
  Stack,
  Modal,
  SegmentedControl,
  Text,
} from '@mantine/core'
import { GoogleButton } from './GoogleButton'
import { useBoundStore } from '@/lib/frontend/store'
import { FenixButton } from './FenixButton'
import { useRouter } from 'next/router'
import { showErrorNotification } from '@/components/Notifications'
import { SignInPageErrorParam } from '@auth/core/types'
import { useEffect, useState } from 'react'
import { links } from '@/data/links'
import { useEdgeStore } from '@/lib/frontend/edgestore'
import { signIn } from '@/lib/frontend/utils/auth-client'

export function LoginDialog() {
  const router = useRouter()
  const [fenixIsLoading, setFenixIsLoading] = useState(false)
  const [googleIsLoading, setGoogleIsLoading] = useState(false)
  const [credentialsIsLoading, setCredentialsIsLoading] = useState(false)

  useEffect(() => {
    const authError = router.query.error as undefined | string

    if (authError) {
      let authErrorFiltered: SignInPageErrorParam = 'Signin'
      try {
        authErrorFiltered = authError as SignInPageErrorParam
      } catch (e) {}
      showErrorNotification({
        title: `Ocorreu um erro, por favor tenta outra vez`,
        message: authErrorFiltered,
      })

      window.history.replaceState('', '', '/')
    }
  }, [router])

  // Getters
  const opened = useBoundStore((state) => state.loginDialogIsVisible)
  const loginType = useBoundStore((state) => state.loginDialogType)
  const loginKey = useBoundStore((state) => state.loginDialogKey)

  // Setters
  const showDialog = useBoundStore((state) => state.showLoginDialog)
  const setLoginType = useBoundStore((state) => state.setLoginDialogType)

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const { reset } = useEdgeStore()

  const handleCredentialsLogin = async (credentials: any) => {
    setCredentialsIsLoading(true)
    const data = signIn.username(
      {...credentials, rememberMe: true },
      {
        onSuccess(ctx) {
          reset()
          router.push(links.company.profile)
          showDialog(false)
          setCredentialsIsLoading(false)
        },
        onError(ctx) {
          if(ctx.error.status === 401) {
            form.setFieldError('password', 'Credenciais inválidas')
          } else {
            showErrorNotification({
              title: `Ocorreu um erro, por favor tenta outra vez`,
              message: ctx.error.statusText ?? 'Unexpected auth error',
            })
          }
          setCredentialsIsLoading(false)
        }
      }
    )
  }

  return (
    <Modal
      opened={opened}
      onClose={() => showDialog(false)}
      withCloseButton={false}
      centered
    >
      <div className="flex flex-col gap-2">
        <Text ta="center" size="lg" fw={500}>
          Iniciar sessão como
        </Text>

        <SegmentedControl
          value={loginType}
          onChange={setLoginType}
          key={loginKey}
          fullWidth
          styles={{
            indicator: {
              transitionDuration: loginKey === 'none' ? '0ms' : undefined,
              opacity: loginKey === 'none' ? '0%' : '100%',
            },
          }}
          data={[
            { label: 'Estudante', value: 'student' },
            { label: 'Empresa', value: 'company' },
          ]}
        />

        {loginType === 'student' ? (
          <>
            <Stack mb="md" mt="md">
              <FenixButton
                loading={fenixIsLoading}
                loaderProps={{
                  color: 'blue',
                  type: 'dots',
                }}
                onClick={async () => {
                  setFenixIsLoading(true)
                  await signIn.oauth2({
                    providerId: 'fenix',
                    callbackURL: links.student.profile,
                  })
                  reset()
                }}
              >
                Entrar com Técnico ID
              </FenixButton>
              <GoogleButton
                onClick={async () => {
                  setGoogleIsLoading(true)
                  await signIn.social({
                    provider: 'google',
                    callbackURL: links.student.profile,
                  })
                  reset()
                }}
                loading={googleIsLoading}
                loaderProps={{
                  color: 'blue',
                  type: 'dots',
                }}
              >
                Entrar com o Google
              </GoogleButton>
            </Stack>
            <Text c="dimmed" ta="center" size="sm">
              Nota: Estudantes do técnico devem entrar com o seu TécnicoID
            </Text>
          </>
        ) : (
          <form onSubmit={form.onSubmit(handleCredentialsLogin)}>
            <Stack>
              <TextInput
                label="Utilizador"
                required
                {...form.getInputProps('username')}
              />

              <PasswordInput
                required
                label="Password"
                {...form.getInputProps('password')}
              />
            </Stack>

            <Group justify="space-between" mt="lg">
              <Button
                fullWidth
                loaderProps={{
                  type: 'dots',
                }}
                loading={credentialsIsLoading}
                type="submit"
              >
                Entrar
              </Button>
            </Group>
          </form>
        )}
      </div>
    </Modal>
  )
}
