import React, { useState } from 'react'
import { ActionIcon, Avatar, Text } from '@mantine/core'
import { TeamMember } from '@/data/team'
import { IconBrandLinkedin } from '@tabler/icons-react'
import Image from 'next/image'

interface TeamMemberProps {
  data: TeamMember
}

const TeamMember = ({ data }: TeamMemberProps) => {
  const bottom = data.customImagePosition?.split(' ')[1] ?? '-45px'

  return (
    <div className="flex flex-col items-center min-w-fit">
      <div className="relative h-36 w-36 overflow-clip rounded-full">
        <div
          style={{
            bottom: bottom,
          }}
          className="absolute h-36 w-36 scale-[2]"
        >
          <Image
            priority
            src={data.image}
            alt="Logo"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <Text c="#00415a" ta="center" fz="xl" mt="sm" fw={600}>
        {data.name}
      </Text>
      <Text ta="center" c="dimmed" fz="md">
        {data.role}
      </Text>
      {!!data.linkedin && (
        <ActionIcon
          component="a"
          target="_blank"
          href={data.linkedin}
          size="lg"
          variant="subtle"
          aria-label="LinkedIn"
        >
          <IconBrandLinkedin color="#0a66c2" />
        </ActionIcon>
      )}
    </div>
  )
}

export default TeamMember
