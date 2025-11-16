// components/StaffForms/EventLogTable.tsx

import { useEffect, useState } from 'react'
import {
  Select,
  Table,
  Title,
  Text,
  Loader,
  Group,
  Container,
  Card,
  ScrollArea,
} from '@mantine/core'

type EventLogType = 'POINTS' | 'AWARDS' | 'ENROLLMENTS'

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

export const EventLogTable = () => {
  const [logs, setLogs] = useState<EventLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<EventLogType | 'ALL'>('ALL')

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true)
      const query = filterType !== 'ALL' ? `?type=${filterType}` : ''
      const res = await fetch(`/api/staff/eventlog${query}`)
      const data = await res.json()
      setLogs(data)
      setLoading(false)
    }
    fetchLogs()
  }, [filterType])

  return (
    <Container size="lg" mt="lg">
      <Title order={2} mb="md">
        Event Logs
      </Title>

      <Card shadow="sm" radius="md" withBorder p="lg" mb="xl">
        <Group mb="md">
          <Select
            label="Filter by type"
            placeholder="Select a type"
            value={filterType}
            onChange={(v) => setFilterType((v as EventLogType) || 'ALL')}
            data={[
              { value: 'ALL', label: 'All' },
              { value: 'POINTS', label: 'Points' },
              { value: 'AWARDS', label: 'Awards' },
              { value: 'ENROLLMENTS', label: 'Enrollments' },
            ]}
          />
        </Group>

        {loading ? (
          <Loader />
        ) : (
          <ScrollArea>
            <Table striped highlightOnHover withTableBorder>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Actor</th>
                  <th>Target</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <Text ta="center" c="dimmed">
                        No logs found
                      </Text>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td>{new Date(log.timestamp).toLocaleString()}</td>
                      <td>{log.type}</td>
                      <td>{log.description}</td>
                      <td>{log.actor?.name ?? '—'}</td>
                      <td>{log.target?.name ?? '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </ScrollArea>
        )}
      </Card>
    </Container>
  )
}
