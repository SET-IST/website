import { Title, Text, Container, Group, Button } from '@mantine/core'
import classNames from 'classnames'

export default function Example() {
  return (
    <div className="h-screen relative overflow-hidden bg-cover bg-no-repeat bg-[url('/img/feira.webp')] flex flex-col items-center justify-center gap-5 sm:gap-10">
      <h1
        className={classNames(
          'text-white font-poppins font-bold text-center text-4xl',
          'md:text-6xl md:leading-relaxed',
          'lg:text-[60px] lg:leading-[90px] lg:tracking-[0.035em]'
        )}
      >
        Jornadas Empresariais e <br />
        Tecnológicas
      </h1>

      <Text className="text-center font-poppins uppercase" fw={600} c="gray.0">
        <span className="sm:text-xl">
          De {process.env.NEXT_PUBLIC_EVENT_DATES} no Instituto Superior Técnico - Taguspark
        </span>
      </Text>
    </div>
  )
}
