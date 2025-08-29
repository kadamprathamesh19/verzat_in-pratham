import React, { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { motion } from "framer-motion";
import logoImg from "../assets/footer/verzat-white-1.png";
import { toast } from 'react-toastify';
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const apiUrl = import.meta.env.VITE_API_URL;

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    


    const handleSubscribe = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success(data.message || "Subscribed successfully!");
                setEmail(""); // Clear input
            } else {
                toast.error(data.message || "Subscription failed");
            }
        } catch (err) {
            console.error("Subscription error:", err);
            toast.error("Server error. Please try again later.");
        }
    };


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToHero = () => {
        const section = document.getElementById('hero');
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100 && currentScrollY < lastScrollY) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <footer className="bg-[#141414] text-gray-400 px-6 md:px-12 py-5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left items-center md:items-start">

                {/* Column 1: Logo & Description */}
                <div className="flex flex-col items-center md:items-start">
                    <a className="cursor-pointer w-32 md:w-60 lg:w-80 mb-4" onClick={scrollToHero}>
                        <img
                            src={logoImg}
                            alt="Logo"
                            className="w-30 h-30 md:w-40 md:h-40 lg:w-40 lg:h-40 object-contain"
                        />
                    </a>

                    <p className="text-sm text-gray-500 text-center md:text-left">
                        Pioneering innovation through research, development, and technology.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            { id: "services", label: "Our Services" },
                            { id: "about", label: "About Us" },
                            { id: "mission", label: "Mission & Vision" },
                            { id: "products", label: "Our Products" },
                            { id: "contact", label: "Contact Us" },
                        ].map(({ id, label }) => (
                            <li key={label}>
                                {isHomePage ? (
                                    // ✅ Native anchor tag on homepage
                                    <a
                                        href={`#${id}`}
                                        className="relative inline-block text-gray-400 hover:text-white transition duration-300 
            before:content-[''] before:absolute before:left-0 before:-bottom-1 
            before:w-0 before:h-[2px] before:bg-blue-600 
            before:transition-all before:duration-300 hover:before:w-full"
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    // ✅ React Router link from other pages
                                    <Link
                                        to={`/#${id}`}
                                        className="relative inline-block text-gray-400 hover:text-white transition duration-300 
            before:content-[''] before:absolute before:left-0 before:-bottom-1 
            before:w-0 before:h-[2px] before:bg-blue-600 
            before:transition-all before:duration-300 hover:before:w-full"
                                    >
                                        {label}
                                    </Link>
                                )}
                            </li>
                        ))}

                        {/* Career is a separate page */}
                        <li>
                            <Link
                                to="/career"
                                className="relative inline-block text-gray-400 hover:text-white transition duration-300 
        before:content-[''] before:absolute before:left-0 before:-bottom-1 
        before:w-0 before:h-[2px] before:bg-blue-600 
        before:transition-all before:duration-300 hover:before:w-full"
                            >
                                Career
                            </Link>
                        </li>
                    </ul>




                </div>


                {/* Column 3: Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Subscribe to our newsletter</h3>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="px-4 py-2 w-full sm:w-auto rounded-md bg-[#1e1e1e] text-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden bg-blue-800 text-white px-6 py-2 rounded-md font-medium transition duration-300 hover:bg-blue-900 shadow-md hover:shadow-lg"
                        >
                            <span className="z-10 relative">Subscribe</span>
                            <span className="absolute inset-0 bg-white opacity-10 hover:opacity-20 transition duration-500 rounded-md" />
                        </motion.button>
                    </form>

                    {/* <!-- From Uiverse.io by ParasSalunke --> */}
                    {/* <div className="flex justify-center sm:justify-start items-start sm:items-center mt-8 ">
                        <div className="relative group">
                            <Link
                                to="/career"
                                className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                            >
                                <span
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></span>

                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1"
                                        >Explore Career</span>
                                        <svg
                                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                            </Link>
                        </div>
                    </div> */}

                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Verzat R&D. All Rights Reserved.
            </div>

            {/* Scroll to Top Button */}
            {showScrollButton && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-2 z-50 p-3 rounded-full bg-[#1e1e1e] text-white shadow-lg hover:shadow-[0_0_20px_#E50914] transition duration-300"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px #E50914" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Scroll to top"
                >
                    <MdKeyboardArrowUp size={24} />
                </motion.button>
            )}
        </footer>
    );
};

export default Footer;
