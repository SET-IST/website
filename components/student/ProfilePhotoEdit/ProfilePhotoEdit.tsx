import { Avatar, Group, Input, Text, rem } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'

const ProfilePhotoEdit = (props: Partial<DropzoneProps>) => {
  return (
    <Input.Wrapper label="Fotografia de perfil">
      <div className="flex flex-row items-center gap-2">
        <Dropzone
          className="max-w-sm"
          onDrop={(files) => console.log('accepted files', files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...props}
        >
          <Group justify="left" gap="md" style={{ pointerEvents: 'none' }}>
            <Avatar size={60} radius="md" />
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-blue-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-red-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <div>
                <Text size="sm" inline>
                  Carregar imagem
                </Text>
                <Text size="xs" c="dimmed" inline mt={2}>
                  Apenas ficheiros de imagem são aceites
                </Text>
              </div>
            </Dropzone.Idle>
          </Group>
        </Dropzone>
      </div>
    </Input.Wrapper>
  )
}

export { ProfilePhotoEdit }
