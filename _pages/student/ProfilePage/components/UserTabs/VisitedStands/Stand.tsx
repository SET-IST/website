import { Text } from '@mantine/core'

export interface StandData {
  name: string
  desc: string
  img: string
}

interface StandComponentProps {
  data: StandData
}

const Stand = ({ data }: StandComponentProps) => {
  return (
    <div className="w-full h-fit p-4 flex flex-row items-center">
      <div className="h-12 w-12 sm:h-15 sm:w-15 shrink-0 overflow-hidden rounded-lg bg-gray-200">
        <img
          src={data.img}
          alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps."
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 sm:ml-6 flex flex-col items-start">
        <Text c="#00415a" fw={600}>
          <span className="text-lg">{data.name}</span>
        </Text>
        <Text c="dimmed" lh={1} lineClamp={2} fw={500}>
          <span className="text-sm">{data.desc}</span>
        </Text>
      </div>
    </div>
  )
}

export default Stand
