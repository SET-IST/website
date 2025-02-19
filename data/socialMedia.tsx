import { SiFacebook, SiInstagram, SiX, SiYoutube, SiLinkedin, SiTiktok } from 'react-icons/si'

const socialMedia = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/settaguspark',
    logo: <SiLinkedin color="white" className="w-9 h-9" />,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/set.ist/',
    logo: <SiInstagram color="white" className="w-9 h-9" />,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@set.tecnico',
    logo: <SiTiktok color="white" className="w-9 h-9" />,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/SET.Tecnico',
    logo: <SiFacebook color="white" className="w-9 h-9" />,
  },
  {
    name: 'X',
    href: 'https://x.com/SET_ISTTagus',
    logo: <SiX color="white" className="w-9 h-9" />,
  },
  // {
  //   name: 'Youtube',
  //   href: 'https://www.youtube.com/user/ISTTagusSET',
  //   logo: <SiYoutube color="white" className="w-9 h-9" />,
  // },
]

export { socialMedia }
