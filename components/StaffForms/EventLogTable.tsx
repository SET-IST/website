// components/StaffForms/EventLogTable.tsx

import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Pagination,
  ScrollArea,
  Select,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks'

type EventLogType = 'POINTS' | 'AWARDS' | 'ENROLLMENTS'
type SortKey = 'timestamp' | 'type' | 'actor'
type SortDir = 'asc' | 'desc'

interface EventLog {
  id: number
  timestamp: string
  type: EventLogType
  description: string
  actor?: { name: string; role: string }
  target?: { name: string; role: string }
  award?: { name: string }
  activity?: { title: string }
}

const PAGE_SIZE = 25

const TYPE_COLORS: Record<EventLogType, string> = {
  POINTS: 'blue',
  AWARDS: 'grape',
  ENROLLMENTS: 'teal',
}

export const EventLogTable = () => {
  const [logs, setLogs] = useState<EventLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filterType, setFilterType] = useState<EventLogType | 'ALL'>('ALL')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebouncedValue(search, 300)

  const [sortKey, setSortKey] = useState<SortKey>('timestamp')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [page, setPage] = useState(1)

  const isMobile = useMediaQuery('(max-width: 48em)')

  // Fetch all entries once; sorting/filtering/pagination happen client-side
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/staff/eventlog')
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        setLogs(await res.json())
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [])

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase()
    const fromTime = from ? new Date(from).getTime() : null
    const toTime = to ? new Date(to).getTime() : null

    const result = logs.filter((log) => {
      if (filterType !== 'ALL' && log.type !== filterType) return false
      const t = new Date(log.timestamp).getTime()
      if (fromTime !== null && t < fromTime) return false
      if (toTime !== null && t > toTime) return false
      if (q) {
        const haystack = [log.description, log.actor?.name, log.target?.name]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    const dir = sortDir === 'asc' ? 1 : -1
    return result.sort((a, b) => {
      if (sortKey === 'timestamp') {
        return (
          (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) *
          dir
        )
      }
      if (sortKey === 'type') return a.type.localeCompare(b.type) * dir
      return (a.actor?.name ?? '').localeCompare(b.actor?.name ?? '') * dir
    })
  }, [logs, filterType, from, to, debouncedSearch, sortKey, sortDir])

  // Go back to page 1 whenever the result set changes
  useEffect(() => {
    setPage(1)
  }, [filterType, from, to, debouncedSearch, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const hasFilters =
    filterType !== 'ALL' || from !== '' || to !== '' || search !== ''

  const clearFilters = () => {
    setFilterType('ALL')
    setFrom('')
    setTo('')
    setSearch('')
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'timestamp' ? 'desc' : 'asc')
    }
  }

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <UnstyledButton onClick={() => toggleSort(k)} fw={700} fz="inherit">
      {label}
      {sortKey === k ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
    </UnstyledButton>
  )

  const renderBody = () => {
    if (loading) {
      return (
        <Stack gap="xs">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height={36} />
          ))}
        </Stack>
      )
    }

    if (error) {
      return (
        <Alert color="red" title="Could not load the event log">
          {error}
        </Alert>
      )
    }

    if (filtered.length === 0) {
      return (
        <Stack align="center" gap="xs" py="xl">
          <Text c="dimmed">
            {hasFilters ? 'No entries match your filters' : 'No entries yet'}
          </Text>
          {hasFilters && (
            <Button variant="light" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </Stack>
      )
    }

    if (isMobile) {
      return (
        <Stack gap="sm">
          {pageItems.map((log) => (
            <Card key={log.id} withBorder radius="md" p="sm">
              <Group justify="space-between" mb={4}>
                <Badge color={TYPE_COLORS[log.type]}>{log.type}</Badge>
                <Text size="xs" c="dimmed">
                  {new Date(log.timestamp).toLocaleString()}
                </Text>
              </Group>
              <Text size="sm" mb={4}>
                {log.description}
              </Text>
              <Text size="xs" c="dimmed">
                By {log.actor?.name ?? '—'} · Target {log.target?.name ?? '—'}
              </Text>
            </Card>
          ))}
        </Stack>
      )
    }

    return (
      <ScrollArea>
        <Table striped highlightOnHover withTableBorder miw={700}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <SortHeader label="Timestamp" k="timestamp" />
              </Table.Th>
              <Table.Th>
                <SortHeader label="Type" k="type" />
              </Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>
                <SortHeader label="Actor" k="actor" />
              </Table.Th>
              <Table.Th>Target</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {pageItems.map((log) => (
              <Table.Tr key={log.id}>
                <Table.Td>{new Date(log.timestamp).toLocaleString()}</Table.Td>
                <Table.Td>
                  <Badge color={TYPE_COLORS[log.type]}>{log.type}</Badge>
                </Table.Td>
                <Table.Td>{log.description}</Table.Td>
                <Table.Td>{log.actor?.name ?? '—'}</Table.Td>
                <Table.Td>{log.target?.name ?? '—'}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    )
  }

  return (
    <Container size="lg" mt="lg">
      <Title order={2} mb="md">
        Event Logs
      </Title>

      <Card shadow="sm" radius="md" withBorder p="lg" mb="xl">
        <Stack gap="md">
          <Group align="flex-end" grow preventGrowOverflow={false}>
            <TextInput
              label="Search"
              placeholder="Description, actor or target"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              miw={220}
            />
            <Select
              label="Filter by type"
              value={filterType}
              onChange={(v) =>
                setFilterType((v as EventLogType | 'ALL') || 'ALL')
              }
              allowDeselect={false}
              data={[
                { value: 'ALL', label: 'All' },
                { value: 'POINTS', label: 'Points' },
                { value: 'AWARDS', label: 'Awards' },
                { value: 'ENROLLMENTS', label: 'Enrollments' },
              ]}
            />
          </Group>

          <Group align="flex-end" grow preventGrowOverflow={false}>
            <TextInput
              label="From"
              type="datetime-local"
              value={from}
              onChange={(e) => setFrom(e.currentTarget.value)}
            />
            <TextInput
              label="To"
              type="datetime-local"
              value={to}
              onChange={(e) => setTo(e.currentTarget.value)}
            />
            {isMobile && (
              <Select
                label="Sort by"
                value={`${sortKey}:${sortDir}`}
                allowDeselect={false}
                onChange={(v) => {
                  if (!v) return
                  const [k, d] = v.split(':')
                  setSortKey(k as SortKey)
                  setSortDir(d as SortDir)
                }}
                data={[
                  { value: 'timestamp:desc', label: 'Newest first' },
                  { value: 'timestamp:asc', label: 'Oldest first' },
                  { value: 'type:asc', label: 'Type (A–Z)' },
                  { value: 'actor:asc', label: 'Actor (A–Z)' },
                ]}
              />
            )}
            {hasFilters && (
              <Button variant="subtle" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </Group>

          {!loading && !error && (
            <Text size="sm" c="dimmed">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            </Text>
          )}

          {renderBody()}

          {!loading && !error && filtered.length > PAGE_SIZE && (
            <Group justify="center">
              <Pagination total={totalPages} value={page} onChange={setPage} />
            </Group>
          )}
        </Stack>
      </Card>
    </Container>
  )
}
