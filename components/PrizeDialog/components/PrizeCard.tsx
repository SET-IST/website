import { AwardToken } from '@/lib/frontend/api'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core'
import { AwardType } from '@prisma/client'
import { QRCode } from 'react-qrcode-logo'

interface PrizeCardProps {
  award: AwardToken
}

export function PrizeCard({ award }: PrizeCardProps) {
  return (
    <Card
      className="h-fit !rounded-lg"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <div className="flex flex-col justify-normal items-center border-t p-2">
          {award?.type === AwardType.NORMAL && (
            <Badge color="blue">{award.award.name}</Badge>
          )}
          {award?.type === AwardType.SPECIAL && (
            <Badge color="indigo">{award.award.name}</Badge>
          )}
        </div>
      </Card.Section>

      <Card.Section>
        <QRCode
          fgColor="#1C7ED6"
          eyeRadius={5}
          qrStyle="dots"
          value={award?.id}
        />
      </Card.Section>

      <Card.Section>
        <div className="flex flex-col justify-normal items-center border-t p-2">
          {award?.type === AwardType.NORMAL && (
            <Badge color="blue">Brinde normal</Badge>
          )}
          {award?.type === AwardType.SPECIAL && (
            <Badge color="indigo">Brinde bónus</Badge>
          )}
        </div>
      </Card.Section>
    </Card>
  )
}
