import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/LogoNav.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos && currentScrollPos > 40) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-50 bg-white backdrop-blur-sm shadow-md"
      >
        <nav className="w-full mx-auto px-5 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="VerzatTech Logo"
              className="h-10  w-25 ml-3 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-[16px] font-medium">
            <a
              href="/"
              className="text-gray-900 pb-1 hover:border-b-2 hover:border-[#5143cf] hover:text-[#5143cf] transition"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 pb-1 hover:border-b-2 hover:border-[#5143cf] hover:text-[#5143cf] transition"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 pb-1 hover:border-b-2 hover:border-[#5143cf] hover:text-[#5143cf] transition"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-700 pb-1 hover:border-b-2 hover:border-[#5143cf] hover:text-[#5143cf] transition"
            >
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex space-x-4 ml-6">
            {[
              { icon: <FaLinkedin />, link: "https://linkedin.com" },
              { icon: <FaTwitter />, link: "https://twitter.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
              { icon: <FaFacebook />, link: "https://facebook.com" },
            ].map(({ icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5143cf] border border-[#5143cf] rounded-full p-2 transition duration-200 hover:bg-[#5143cf] hover:text-white"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-gray-800 w-6 h-6" />
            ) : (
              <FaBars className="text-gray-800 w-6 h-6" />
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#141414]/95 px-6 py-4 space-y-4 text-white text-lg">
            <Link
              to="/"
              className="block py-2 px-2 rounded-sm hover:bg-white hover:text-blue-800"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 px-2 rounded-sm hover:bg-white hover:text-blue-800"
            >
              About
            </Link>
            <Link
              to="/services"
              className="block py-2 px-2 rounded-sm hover:bg-white hover:text-blue-800"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-2 rounded-sm hover:bg-white hover:text-blue-800"
            >
              Contact
            </Link>
            <div className="flex space-x-4 pt-4 border-t border-gray-600">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </div>
          </div>
        )}
      </motion.header>
    </>
  );
};

export default Navbar;
