import React, { useState } from 'react'
import { ActionIcon, Avatar, Text } from '@mantine/core'
import { ITeamMember, ImageFormat } from '@/data/team'
import { IconBrandLinkedin } from '@tabler/icons-react'
import Image from 'next/image'

interface TeamMemberProps {
  data: ITeamMember
}

const TeamMember = ({
  data,
  imageFormat,
}: TeamMemberProps & { imageFormat: ImageFormat }) => {
  let bottom = '0px'
  let classes =''
  let classes2 = ''

  if (imageFormat === 'round') {
    bottom = '-45px'
    classes = 'relative h-36 w-36 overflow-clip rounded-full'
    classes2 = 'absolute h-36 w-36 scale-[2]'
  }
  else if (imageFormat === 'original'){
    bottom = '30px'
    classes = 'relative h-52 w-36 overflow-show'
    classes2 = 'absolute h-44 w-36'
  }
  if (data.customImagePosition) {
    bottom = data.customImagePosition.split(' ')[1]
  }

  return (
    <div className="flex flex-col items-center min-w-fit">
      <div className={classes}>
        <div
          style={{
            bottom: bottom,
          }}
          className={classes2}
        >
          <Image
            src={data.image}
            alt="Logo"
            style={{ objectFit: 'cover' }}
            quality={50}
            placeholder="blur"
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
