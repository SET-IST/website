import { useRef, useState } from 'react'
import {
  Avatar,
  Badge,
  Combobox,
  Group,
  Loader,
  TextInput,
  useCombobox,
  Text,
  CloseButton,
} from '@mantine/core'
import { IconQrcode } from '@tabler/icons-react'
import { useUsersSearch } from '@/lib/frontend/hooks'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import { FormErrors } from '@mantine/form'
import { User } from '@prisma/client'
import { StaffScan } from './StaffScan/StaffScan'
import { fetchUser } from '@/lib/frontend/api'

interface AccountSelectProps {
  errors: FormErrors
  callback: (accountData: User) => void
}

export function AccountSelect({ errors, callback }: AccountSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const [query, setQuery] = useState<string | undefined>('')
  const [value, setValue] = useState<string | undefined>('')

  const [debouncedQuery] = useDebouncedValue(query, 200)
  const { data, isLoading } = useUsersSearch(debouncedQuery)

  const [scanModalVisible, { open: openScanModal, close: closeScanModal }] =
    useDisclosure(false)

  const options = (data || []).map((item, index) => (
    <Combobox.Option value={JSON.stringify(item)} key={'option_' + index}>
      <Group wrap="nowrap">
        <Avatar src={item.image} radius="xl" />
        <div style={{ flex: 1 }}>
          <div className="flex flex-row items-center gap-2">
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
            <Badge size="sm">{item.role}</Badge>
          </div>

          <Text c="dimmed" size="xs">
            {item.email}
          </Text>
          <Text c="dimmed" size="xs">
            {item.id}
          </Text>
        </div>
      </Group>
    </Combobox.Option>
  ))

  return (
    <>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue((JSON.parse(optionValue) as User).id)
          callback(JSON.parse(optionValue) as User)
          combobox.closeDropdown()
        }}
        withinPortal={false}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            label="Conta"
            description="As contas podem ser encontradas pelo nome, email ou UUID"
            placeholder="Procurar"
            required
            value={value ?? query}
            onChange={(event) => {
              setValue(undefined)
              setQuery(event.currentTarget.value)
              combobox.resetSelectedOption()
              combobox.openDropdown()
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => {
              combobox.openDropdown()
            }}
            onBlur={() => combobox.closeDropdown()}
            rightSection={
              isLoading ? (
                <Loader size={18} />
              ) : (
                <CloseButton
                  onClick={openScanModal}
                  icon={<IconQrcode size={26} stroke={1.5} />}
                />
              )
            }
            error={errors['uuid']}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={data === null}>
          <Combobox.Options>
            {options}
            {data?.length === 0 && (
              <Combobox.Empty>Sem resultados</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <StaffScan
        label="Scan de utilizador"
        fetchMethod={fetchUser}
        callback={(data) => {
          setValue((data as User).id)
          setQuery((data as User).id)
          callback(data)
          combobox.resetSelectedOption()
          combobox.openDropdown()
        }}
        visible={scanModalVisible}
        onClose={closeScanModal}
      />
    </>
  )
}
