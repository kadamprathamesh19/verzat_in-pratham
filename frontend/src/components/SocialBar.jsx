import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { SiX } from "react-icons/si";

const socialLinks = [
  { href: "https://www.linkedin.com/company/verzat-technologies/", icon: <FaLinkedin /> },
  { href: "https://x.com/Verzat_era", icon: <SiX /> },
  { href: "https://www.instagram.com/verzat_technologies/", icon: <FaInstagram /> },
  { href: "https://www.facebook.com/verzat/", icon: <FaFacebook /> },
];

const SocialBar = () => {
  return (
    <div className="fixed top-[5%] right-0 z-40 hidden sm:flex flex-col items-center space-y-4 p-2 bg-[#0f172a]/80 backdrop-blur-md rounded-l-xl shadow-lg border-l border-blue-700">
      {socialLinks.map(({ href, icon }, idx) => (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center text-white bg-[#1e293b] hover:text-white hover:bg-blue-700 rounded-full transition duration-300 shadow-md"
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialBar;
