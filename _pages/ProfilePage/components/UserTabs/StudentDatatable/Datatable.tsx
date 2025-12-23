import { useEffect, useState } from 'react'
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Avatar,
  ActionIcon,
  Pagination,
  em,
} from '@mantine/core'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconFileCv,
  IconFilter,
  IconFileDownload,
} from '@tabler/icons-react'
import classes from './Datatable.module.css'
import { useCompanyStudentsScans } from '@/lib/frontend/hooks/company'
import {
  useDebouncedState,
  useDebouncedValue,
  useMediaQuery,
} from '@mantine/hooks'
import {
  CompanyProfile,
  CompanyStudentFiled,
  CompanyStudents,
} from '@/lib/frontend/api'
import { getCourse, getInstitution } from '@/lib/frontend/utils'
import { useProfile } from '@/lib/frontend/hooks'
import { CompanyCategory } from '@prisma/client'

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  onSort(): void
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  )
}

export function StudentDatatable() {
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useDebouncedState<string | undefined>(
    undefined,
    200
  )

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

  const { data, isLoading, isError } = useCompanyStudentsScans(
    page,
    searchQuery
  )

  const { data: userData } = useProfile()
  const company = userData as CompanyProfile

  useEffect(() => {
    // Reset page on new query
    setPage(1)
  }, [searchQuery])

  const [sortBy, setSortBy] = useState<CompanyStudentFiled | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: CompanyStudentFiled) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
  }

  const sortData = (
    data: CompanyStudents | undefined,
    payload: { sortBy: CompanyStudentFiled | null; reversed: boolean }
  ) => {
    const { sortBy } = payload

    if (!sortBy) {
      return data
    }

    return {
      ...data,
      data: data?.data.sort((a, b) => {
        if (payload.reversed) {
          return String(b[sortBy]).localeCompare(String(a[sortBy]))
        }

        return String(a[sortBy]).localeCompare(String(b[sortBy]))
      }),
    }
  }

  // Create rows
  const rows = sortData(data, {
    sortBy,
    reversed: reverseSortDirection,
  })?.data?.map((row) => (
    <Table.Tr key={row?.id}>
      {isMobile ? ( //faltava o mobile case (I think it works now?)
        <Table.Td>
          <Group gap="sm" wrap="nowrap">
            <Avatar size={42} src={row?.image} radius={42} />

            <div className="min-w-0">
              <Text size="sm" fw={500} truncate>
                {row?.name}
              </Text>

              <Text size="xs" c="dimmed" truncate>
                {getCourse(row?.university, row?.course)?.name}
              </Text>

              <Text size="xs" c="dimmed" truncate>
                {getInstitution(row?.university)?.name}
              </Text>
            </div>

            {company?.companyDetails?.category === CompanyCategory.Platinum && (
              <ActionIcon
                disabled={!row.cvLocation}
                size="md"
                variant="subtle"
                component="a"
                href={
                  row.cvLocation
                    ? process.env.NEXT_PUBLIC_API_BASE_URL +
                      '/company/students/cv/' +
                      encodeURIComponent(row.cvLocation)
                    : ''
                }
              >
                <IconFileDownload
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.4}
                />
              </ActionIcon>
            )}
          </Group>
        </Table.Td>
      ) : (
        <>
          <Table.Td>
            <Group wrap="nowrap" gap="sm">
              <Avatar size={42} src={row?.image} radius={42} />
              <Text className="whitespace-nowrap" size="sm" fw={500}>
                {row?.name}
              </Text>
            </Group>
          </Table.Td>

          <Table.Td>{row?.email}</Table.Td>
          <Table.Td>{getCourse(row?.university, row?.course)?.name}</Table.Td>
          <Table.Td>{getInstitution(row?.university)?.name}</Table.Td>

          {company?.companyDetails?.category === CompanyCategory.Platinum && (
            <Table.Td>
              <ActionIcon
                disabled={!row.cvLocation}
                size="lg"
                variant="default"
                component="a"
                href={
                  row.cvLocation
                    ? process.env.NEXT_PUBLIC_API_BASE_URL +
                      '/company/students/cv/' +
                      encodeURIComponent(row.cvLocation)
                    : ''
                }
              >
                <IconFileDownload
                  style={{ width: rem(24), height: rem(24) }}
                  stroke={1.4}
                />
              </ActionIcon>
            </Table.Td>
          )}
        </>
      )}
    </Table.Tr>
  ))

  return (
  <div className="h-full flex flex-col overflow-y-hidden">
    <TextInput
      placeholder="Procurar por estudante, curso ou instituição"
      leftSection={
        <IconSearch
          style={{ width: rem(16), height: rem(16) }}
          stroke={1.5}
        />
      }
      onChange={(evt) => setSearchQuery(evt.currentTarget.value)}
      p="xs"
    />

    <div className="h-full overflow-scroll">
      <Table horizontalSpacing="md" verticalSpacing="xs" layout="auto">
        <Table.Thead>
          <Table.Tr className="sticky top-0 z-20 bg-[var(--mantine-color-body)]">
            {isMobile ? ( //faltava o mobile case (I think it works now?)
              <Table.Th className={classes.th}>
                <Text fw={500} fz="sm">
                  Estudante
                </Text>
              </Table.Th>
            ) : (
              <>
                <Th
                  sorted={sortBy === 'name'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('name')}
                >
                  Nome
                </Th>

                <Th
                  sorted={sortBy === 'email'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('email')}
                >
                  Email
                </Th>

                <Th
                  sorted={sortBy === 'course'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('course')}
                >
                  Curso
                </Th>

                <Th
                  sorted={sortBy === 'university'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('university')}
                >
                  Instituição
                </Th>

                {company?.companyDetails?.category === CompanyCategory.Platinum && (
                  <Table.Th className={classes.th}>
                    <Text fw={500} fz="sm">
                      CV
                    </Text>
                  </Table.Th>
                )}
              </>
            )}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td
                colSpan={
                  isMobile
                    ? 1
                    : company?.companyDetails?.category ===
                      CompanyCategory.Platinum
                    ? 5
                    : 4
                }
              >
                <Text fw={500} ta="center">
                  Sem resultados
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>

    <div className="flex flex-col items-end p-4">
      <Pagination
        value={page}
        onChange={setPage}
        size="sm"
        total={data?.pagination.pages ?? 0}
      />
    </div>
  </div>
)}
