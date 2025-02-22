import { SiFacebook, SiInstagram, SiX, SiYoutube, SiLinkedin, SiTiktok } from 'react-icons/si'

export default function SocialLinks() {
    return (
        <div className="flex flex-wrap gap-4">
            <a
            href="https://www.linkedin.com/company/settaguspark"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-blue-600"
            >
                <SiLinkedin size={24} />
            </a>
            <a
            href="https://www.instagram.com/set.ist/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-600 hover:text-pink-600"
            >
                <SiInstagram size={24} />
            </a>
            <a
            href="https://www.tiktok.com/@set.tecnico"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-gray-600 hover:text-black"
            >
                <SiTiktok size={24} />
            </a>
            <a
            href="https://www.facebook.com/SET.Tecnico/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-600 hover:text-blue-700"
            >
                <SiFacebook size={24} />
            </a>
            <a
            href="https://x.com/SET_ISTTagus"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-gray-600 hover:text-black"
            >
                <SiX size={24} />
            </a>
            {/* <a
            href="https://www.youtube.com/user/ISTTagusSET"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Youtube"
            className="text-gray-600 hover:text-red-600"
            >
                <SiYoutube size={24} />
            </a> */}
        </div>
    )
}
