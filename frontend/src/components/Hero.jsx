import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { SiX } from "react-icons/si";
import profileImg from "../assets/profile.jpg";

import LoginModal from "./LoginModal";
import ModalNav from "./ModalNav";
import heroBg from "../assets/hero-bg.mp4";
import logoImg from "../assets/Hero/hero-logo.png";
import { HeroContentContext } from "../context/HeroContentContext";

import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/verzat-technologies/",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://x.com/Verzat_era?t=UJqlK6G3p8seWoPmUOoHkQ&s=08",
    label: "X",
    icon: <SiX />,
  },
  {
    href: "https://www.instagram.com/verzat_technologies/",
    label: "Instagram",
    icon: <FaInstagram />,
  },
  {
    href: "https://www.facebook.com/verzat/",
    label: "Facebook",
    icon: <FaFacebook />,
  },
];

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const { heroContent, loading, error } = useContext(HeroContentContext);

  // Default title if none from backend
  const rawTitle = heroContent?.title || "Pioneering Innovation in R&D";

  // Split the title into words
  const words = rawTitle.trim().split(" ");

  // Example: Highlight second word (or fallback)
  const titlePart1 = words[0] || "";
  const titleHighlight = words[1] || "";
  const titlePart2 = words.slice(2).join(" ") || "";


  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[150vh] w-full overflow-hidden rounded-t-sm"
    >
      {/* Background Video */}
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-md"
        src={heroContent.videoUrl || heroBg}  // use backend videoUrl, fallback to local
        autoPlay
        muted
        loop
        playsInline
      />


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Top bar with Logo and Social icons */}
      <div className="absolute top-1 md:top-10 left-4 right-1 flex justify-between items-center z-30 px-4">
        {/* Logo */}
        <a href="/" className="w-16 sm:w-20 md:w-24 lg:w-32">
          <img
            src={logoImg}
            alt="Logo"
            className="w-full h-12 sm:h-14 md:h-16 lg:h-24 object-contain"
          />
        </a>

        {/* Social Icons (Mobile Only) */}
        <div className="flex space-x-3 text-white text-md absolute top-1 right-2 z-30 md:hidden">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-transparent hover:text-white hover:bg-blue-700 transition duration-300"
            >
              {icon}
            </a>
          ))}

          {/* Profile Icon - Mobile */}
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            aria-label="Profile"
            className="flex items-center ml-2 justify-center w-7 h-7 top-1 rounded-full bg-transparent hover:bg-blue-700 text-white transition duration-300 transform hover:scale-110 md:hidden"
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-4 h-4 object-cover rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Profile Icon - Desktop */}
      <div className="hidden md:block absolute top-[3%] right-[0.5%] z-30 cursor-pointer">
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          aria-label="Profile"
          className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-blue-700 hover:ring-2 ring-blue-600 transition duration-300 transform hover:scale-110"
        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-10 h-10 object-cover"
          />
        </button>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="relative z-20 text-center max-w-3xl px-6 mx-auto flex flex-col justify-center items-center h-full"
        data-aos="fade-up"
      >
        {loading ? (
          <p className="text-white text-xl">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              <span>
                {titlePart1}{" "}
                <span className="text-white font-extrabold text-4xl md:text-6xl sm:text-5xl">
                  {titleHighlight}
                </span>
              </span>
              <br />
              <span className="block mt-1">{titlePart2}</span>
            </h1>


            <p className="text-lg md:text-xl text-gray-300 mb-6">
              {heroContent.subtitle}
            </p>
          </>
        )}
      </motion.div>

      {/* Explore More Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToContact}
        className="absolute bottom-8 right-[4%] bg-blue-800 text-white px-6 py-2 rounded-md text-md font-semibold hover:bg-blue-900 transition z-30"
      >
        Explore More
      </motion.button>

      {/* Modal Navigation */}
      {modalOpen && <ModalNav onClose={() => setModalOpen(false)} />}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </section>
  );
};

export default Hero;
