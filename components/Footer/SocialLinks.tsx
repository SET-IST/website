import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaTiktok } from "react-icons/fa";

export default function SocialLinks() {
    return (
        <div className="flex gap-4">
            <a
            href="https://www.linkedin.com/company/settaguspark"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-blue-600"
            >
                <FaLinkedin size={24} />
            </a>
            <a
            href="https://www.instagram.com/set.ist/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-600 hover:text-pink-600"
            >
                <FaInstagram size={24} />
            </a>
            <a
            href="https://www.facebook.com/SET.Tecnico/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-600 hover:text-blue-700"
            >
                <FaFacebook size={24} />
            </a>
            <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-gray-600 hover:text-black"
            >
                <FaTiktok size={24} />
            </a>
            <a
            href="https://x.com/SET_ISTTagus"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 hover:text-blue-400"
            >
                <FaTwitter size={24} />
            </a>
        </div>
    )
}
