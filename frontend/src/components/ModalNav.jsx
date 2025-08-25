import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
// import ModalSignIn from "./ModalSignIn";


// Backdrop animation
const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

// Modal animation
const modal = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 18 },
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.3, ease: "easeInOut" },
    },
};

const ModalSignIn = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex justify-center items-center"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    className="bg-[#141414] w-full max-w-md mx-auto rounded-xl p-8 md:p-10 relative text-white shadow-2xl"
                    variants={modal}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-blue-800 text-xl transition hover:scale-110"
                        aria-label="Close sign in modal"
                    >
                        <FaTimes />
                    </button>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Sign in to <span className="text-blue-800">Verzat</span>
                    </h2>

                    {/* Form */}
                    <form className="space-y-6">
                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder=" "
                                required
                                className="w-full px-4 pt-5 pb-2 bg-[#1e1e1e] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
                            />
                            <label className="absolute top-1 left-4 text-sm text-gray-400 pointer-events-none transition-all">
                                Email address
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder=" "
                                required
                                className="w-full px-4 pt-5 pb-2 bg-[#1e1e1e] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
                            />
                            <label className="absolute top-1 left-4 text-sm text-gray-400 pointer-events-none transition-all">
                                Password
                            </label>
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-800 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition"
                            type="submit"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <p className="text-sm text-gray-400 mt-6 text-center">
                        Don’t have an account?{" "}
                        <a href="#" className="text-blue-800 hover:underline">
                            Create one
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ModalSignIn;
