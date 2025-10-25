import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import {
  Avatar,
  Badge,
  Button,
  CloseButton,
  Divider,
  Group,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { AccountSelect } from './components'
import { AwardType, User, UserType } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useCreateAward, useUserDetails } from '@/lib/frontend/hooks'
import { AwardData, Awards, fetchAwardsList, readAward, redeemAward, modifyAward } from '@/lib/frontend/api'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../Notifications'
import { StaffScan } from './components/StaffScan/StaffScan'
import { useDisclosure } from '@mantine/hooks'
import { IconQrcode } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

interface PrizeCreationFormValues {
  uuid?: string
  type: AwardType
}

const PrizeValidationForm = () => {
  // Prize validation
  const [scanModalVisible, { open: openScanModal, close: closeScanModal }] =
    useDisclosure(false)

  const [award, setAward] = useState<AwardData>(undefined)

  // Prize attribuition
  const prizeCreationForm = useForm<PrizeCreationFormValues>({
    validate: yupResolver(
      Yup.object().shape({
        uuid: Yup.string()
          .uuid('UUID inválido')
          .required('É necessário fornecer um UUID válido'),
      })
    ),
    initialValues: {
      uuid: undefined,
      type: AwardType.NORMAL,
    },
  })

  const { data: userDetails } = useUserDetails(prizeCreationForm.values.uuid)

  const isValidUser = !!userDetails && userDetails.role !== UserType.Company

  const {
    mutateAsync: createAward,
    data: createdAward,
    isPending,
  } = useCreateAward()

  const createAwardCallback = (values: PrizeCreationFormValues) => {
    if (!values.uuid) return

    createAward({
      uuid: values.uuid,
      type: values.type,
    })
      .then(() => {
        showSuccessNotification({
          message: 'Brinde atribuído com sucesso',
        })
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          showErrorNotification({
            message: 'Esta conta já tem um brinde por resgatar',
          })
        } else {
          showErrorNotification({
            title: `Ocorreu um erro, por favor tenta outra vez`,
            message: error.message,
          })
        }
      })
  }

  // Load awards list
  const { data: awardsListData, isPending: isAwardsListLoading, isError: isAwardsListError, isSuccess: isAwardsListSuccess } = useQuery({
    queryKey: ['awardsList'],
    queryFn: () => fetchAwardsList()
  })
  // transform awardsListData into combo box data
  const awardsList = awardsListData?.filter((award_data) => award_data.type === AwardType.NORMAL || award_data.type === award?.type)?.map((award) => ({
      label: award?.name,
      value: award?.id.toString(),
    })) ?? []

  const [isChangingAward, setIsChangingAward] = useState(false)

  return (
    <div className="h-fit p-4">
      <Text c="#00415a" fz="xl" fw={700}>
        STAFF - Gestão de brindes
      </Text>
      <Divider
        my="md"
        label={
          <Text c="gray" fz="xs" fw={700}>
            Resgatar brinde
          </Text>
        }
        labelPosition="left"
      />
      <TextInput
        label="Brinde (Token)"
        description="Só é possível resgatar brindes com um código QR"
        placeholder="UUID"
        disabled
        value={award?.id ?? ''}
        rightSection={
          <CloseButton
            onClick={openScanModal}
            icon={<IconQrcode size={26} stroke={1.5} />}
          />
        }
      />
      {!!award && (
        <div className="w-full py-4 gap-2 flex flex-col">
          <Group wrap="nowrap">
            <div style={{ flex: 1 }}>
              <div className="flex flex-row items-center gap-2">
                <Text size="sm" fw={500}>
                  Brinde:
                </Text>
                <Badge size="md">{award?.award.name}</Badge>
                <Badge size="sm">{award?.type}</Badge>
              </div>
              <Text size="sm" fw={500}>
                Estudante:
              </Text>
            </div>
          </Group>
          <Group wrap="nowrap">
            <Avatar src="" radius="xl" />
            <div style={{ flex: 1 }}>
              <div className="flex flex-row items-center gap-2">
                <Text size="sm" fw={500}>
                  {award?.student.user.name}
                </Text>
              </div>

              <Text c="dimmed" size="xs">
                {award?.student.user.email}
              </Text>
              <Text c="dimmed" size="xs">
                {award?.student.user.id}
              </Text>
            </div>
          </Group>
          {isChangingAward
            && (
          <Select
            label="Brinde"
            description="Trocar valor abaixo para trocar o brinde"
            defaultValue={award.award.id.toString()}
            onChange={(value, option) => {
              console.log('Selected award:', option);
                modifyAward(award.id, Number(value));
                award.award.name = option.label;
            }}
            data={awardsList}
            disabled={!isChangingAward}
            allowDeselect={false}
          />
          )}
          <div className="flex flex-col sm:flex-row  gap-3 mt-6 sm:mt-4">
            {!isChangingAward
            && (
            <Button type="button" onClick={() => {setIsChangingAward(true); }}>
              Trocar brinde
            </Button>
            )}
            <Button type="button" color='green' onClick={() => {setIsChangingAward(false); redeemAward(award.id); showSuccessNotification({message: award.award.name + ' confirmado',}); setAward(undefined); }} >
              Redimir Brinde
            </Button>
          </div>
        </div>
      )}
      <Divider
        my="md"
        label={
          <Text c="gray" fz="xs" fw={700}>
            Atribuir brinde
          </Text>
        }
        labelPosition="left"
      />
      <form
        onSubmit={prizeCreationForm.onSubmit(createAwardCallback)}
        className="mt-4 flex flex-col gap-2"
      >
        <AccountSelect
          callback={(userData) =>
            prizeCreationForm.setFieldValue('uuid', userData.id)
          }
          errors={prizeCreationForm.errors}
        />

        <Select
          label="Brinde"
          defaultValue={AwardType.NORMAL}
          onChange={(value) =>
            prizeCreationForm.setFieldValue('type', value as AwardType)
          }
          data={[
            {
              label: 'NORMAL',
              value: AwardType.NORMAL,
            },
            {
              label: 'BÓNUS',
              value: AwardType.SPECIAL,
            },
          ]}
          disabled={!isValidUser}
        />

        {createdAward && (
          <Group wrap="nowrap">
            <div style={{ flex: 1 }}>
              <div className="flex flex-row items-center gap-2">
                <Text size="sm" fw={500}>
                  Tipo:
                </Text>
                <Badge size="sm">{createdAward?.type}</Badge>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Text size="sm" fw={500}>
                  UUID:
                </Text>
                <Text c="dimmed" size="xs">
                  {createdAward?.id}
                </Text>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Text size="sm" fw={500}>
                  Estudante:
                </Text>
                <Text c="dimmed" size="xs">
                  {createdAward?.id}
                </Text>
              </div>
            </div>
          </Group>
        )}

        <div className="flex flex-col sm:flex-row  gap-3 mt-6 sm:mt-4">
          <Button disabled={!isValidUser} loading={isPending} type="submit">
            Aplicar
          </Button>
        </div>
      </form>
      <StaffScan
        label="Resgatar brinde"
        fetchMethod={readAward}
        callback={(data) => {
          setAward(data)
          // showSuccessNotification({
          //   message: 'Brinde confirmado',
          // })
        }}
        visible={scanModalVisible}
        onClose={closeScanModal}
      />
    </div>
  );
}

export { PrizeValidationForm }
