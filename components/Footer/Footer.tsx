import { Text } from '@mantine/core'
import SetLogo from '@/assets/logos/logo_set.svg'
import classes from './FooterLinks.module.css'

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--mantine-color-gray-2)] bg-[color:var(--mantine-color-gray-1)] pt-5 sm:pt-10 pb-5">
      <div className="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-between items-start sm:items-center mx-5 sm:mx-20 py-8">
        <SetLogo aria-hidden />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="flex flex-col gap-0">
            <Text className={classes.title}>Localização</Text>
            <span>Instituto Superior Técnico (Campus Taguspark)</span>
            <span>Av. Prof. Doutor Cavaco Silva, 2744-016 Porto Salvo</span>
          </div>
          <div className="flex flex-col gap-0">
            <Text className={classes.title}>Contactos</Text>
            <span>
              <strong>geral@set-tagus.tecnico.ulisboa.pt</strong>
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-0">
            <Text className={classes.title}>Ajuda</Text>
            {/* <Text<'a'>
              className={classes.link}
              component="a"
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              FAQ
            </Text> */}
            <Text
              className={classes.link}
              component="a"
              target="_blank"
              href="https://forms.gle/77rwxPZ7tTMSrci48"
            >
              Reportar um bug
            </Text>
          </div>
        </div>
      </div>
    </footer>
  )
}
