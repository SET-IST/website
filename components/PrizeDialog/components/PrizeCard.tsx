import { AwardToken } from '@/lib/frontend/api'
import { Card, Badge } from '@mantine/core'
import { AwardType } from '@prisma/client'
import { QRCode } from 'react-qrcode-logo'

interface PrizeCardProps {
  award: AwardToken
}

export function PrizeCard({ award }: PrizeCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="bg-white w-fit mx-auto"
    >
      <Card.Section className="border-b">
        <div className="flex flex-col items-center p-2">
          {award?.type === AwardType.NORMAL && (
            <Badge color="blue" className="whitespace-normal break-words px-4"> {award.award.name}</Badge>
          )}
          {award?.type === AwardType.SPECIAL && (
            <Badge color="indigo" className="whitespace-normal break-words px-4">{award.award.name}</Badge>
          )}
        </div>
      </Card.Section>

    <Card.Section className="p-4">
      <div className="flex flex-col items-center">
        <QRCode
          fgColor="#1C7ED6"
          eyeRadius={5}
          qrStyle="dots"
          value={award?.id}
          />
        </div>
      </Card.Section>

      <Card.Section className="border-t">
        <div className="flex flex-col items-center p-2">
          {award?.type === AwardType.NORMAL && (
            <Badge color="blue" className="whitespace-normal break-words px-4">Brinde normal</Badge>
          )}
          {award?.type === AwardType.SPECIAL && (
            <Badge color="indigo" className="whitespace-normal break-words px-4">Brinde bónus</Badge>
          )}
        </div>
      </Card.Section>
    </Card>
  )
}
