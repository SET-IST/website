import { useState } from 'react'
import {
  Avatar,
  Badge,
  Combobox,
  Group,
  useCombobox,
  Text,
  InputBase,
  Input,
  Tooltip,
  SegmentedControl,
  rem,
} from '@mantine/core'
import { useActivities } from '@/lib/frontend/hooks'
import { FormErrors } from '@mantine/form/lib/types'
import { ActivityData } from '@/lib/frontend/api/activities'
import { IconMapPin } from '@tabler/icons-react'
import { DateTime } from 'luxon'
import { useBoundStore } from '@/lib/frontend/store'

interface AccountSelectProps {
  callback: (activity: ActivityData) => void
}

function SelectOption(data: ActivityData) {
  const date = data?.date ? DateTime.fromISO(String(data.date)) : DateTime.now()
  return (
    <div className="w-full h-fit flex flex-col gap-2">
      {data?.companies && (
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Avatar.Group spacing="sm">
            {data.companies.map((company, index) => (
              <Tooltip
                key={`${data.id}_company_${index}`}
                label={company.user.name}
                withArrow
              >
                <Avatar src={company.user.image} radius="xl" />
              </Tooltip>
            ))}
          </Avatar.Group>
        </Tooltip.Group>
      )}
      <div>
        <Text size="sm" fw={500}>
          {data?.title}
        </Text>
        <Badge variant="dot" radius="sm" size="sm">
          {data?.type}
        </Badge>

        <Text c="dimmed" lh={1} fw={500}>
          <span className="text-sm">{data?.description}</span>
        </Text>
      </div>
      <div className="flex flex-row flex-wrap gap-1">
        <Badge variant="default" radius="sm" size="sm">
          {date.setLocale('pt').toFormat("d 'de' LLLL 'às' HH:mm")}
        </Badge>
        <Badge
          variant="default"
          radius="sm"
          size="sm"
          leftSection={
            <IconMapPin style={{ width: rem(12), height: rem(12) }} />
          }
        >
          {data?.location}
        </Badge>
      </div>
    </div>
  )
}

export function ActivitySelect({ callback }: AccountSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const currentDay = useBoundStore((state) => state.selectedDay)
  const setCurrentDate = useBoundStore((state) => state.setSelectedDate)
  const activeDays = useBoundStore((state) => state.activeDays)
  const fetchActiveDays = useBoundStore((state) => state.fetchActiveDays)

  const { data: activities, isLoading } = useActivities(currentDay?.date.toISOString() ?? '1970-01-01')
  const [activity, setActivity] = useState<undefined | ActivityData>(undefined)

  const options = (activities || []).map((item, index) => (
    <Combobox.Option value={JSON.stringify(item)} key={'option_' + index}>
      <SelectOption {...item!} />
    </Combobox.Option>
  ))

  return (
    <>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setActivity(JSON.parse(optionValue) as ActivityData)
          callback(JSON.parse(optionValue) as ActivityData)
          combobox.closeDropdown()
        }}
        withinPortal={false}
        store={combobox}
      >
        <Combobox.Target>
          <InputBase
            label="Atividade"
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            required
            multiline
          >
            {activity ? (
              <SelectOption {...activity} />
            ) : (
              <Input.Placeholder>Selecionar atividade</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <SegmentedControl
            fullWidth
            value={currentDay?.date?.toISOString()}
            onChange={setCurrentDate}
            data={activeDays.map(d => ({
              label: 'Dia ' + d.date.getDay(),
              value: DateTime.fromFormat(d.dateCode, "dd_LL_yyyy").toFormat("yyyy-LL-dd")
            }))}
          />
          <Combobox.Options>
            {options}
            {!activities ||
              (activities?.length === 0 && (
                <Combobox.Empty>Sem resultados</Combobox.Empty>
              ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  )
}
