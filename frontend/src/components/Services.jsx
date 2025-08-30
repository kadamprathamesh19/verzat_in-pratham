import React, { useEffect, useState, useMemo } from "react"; // UPDATED: Added useMemo
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchSectionDescription, fetchSectionTitle } from "../services/servicesApi";
import ThreeLogoBackground from "./ThreeLogoBackground";
import { decode } from "html-entities"; // UPDATED: Added decoder

import {
    FaRobot,
    FaBrain,
    FaCode,
    FaProjectDiagram,
    FaMicrochip,
    FaLaptopCode,
} from "react-icons/fa";


// Icon map for mapping backend icon names
const iconMap = {
    FaRobot: <FaRobot className="text-4xl text-blue-800" />,
    FaBrain: <FaBrain className="text-4xl text-blue-800" />,
    FaCode: <FaCode className="text-4xl text-blue-800" />,
    FaProjectDiagram: <FaProjectDiagram className="text-4xl text-blue-800" />,
    FaMicrochip: <FaMicrochip className="text-4xl text-blue-800" />,
    FaLaptopCode: <FaLaptopCode className="text-4xl text-blue-800" />,
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    // UPDATED: Decode title and description using useMemo for efficiency
    const decodedTitle = useMemo(() => decode(title || ""), [title]);
    const decodedDescription = useMemo(() => decode(description || ""), [description]);

    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-in-out", once: true });

        // Fetch dynamic Title
        fetchSectionTitle()
            .then((title) => setTitle(title))
            .catch((err) => console.error("Failed to fetch title:", err));

        // Fetch dynamic description
        fetchSectionDescription()
            .then((desc) => setDescription(desc))
            .catch((err) => console.error("Failed to fetch description:", err));

        // Fetch services
        fetch(`${apiUrl}/api/services`)
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Failed to fetch services:", err));

    }, []);

    // Split title into words and style last word in blue
    const renderTitle = () => {
        // UPDATED: Use the decodedTitle for splitting logic
        if (!decodedTitle) return "Loading...";
        const words = decodedTitle.trim().split(" ");
        const lastWord = words.pop();
        return (
            <>
                {words.join(" ")}{" "}
                <span className="text-blue-800">{lastWord}</span>
            </>
        );
    };

    return (
        <section
            className="relative z-0 min-h-screen py-24 px-6 md:px-12 bg-gradient-to-br from-[#e2e8f0] via-[#f8fafc] to-[#cbd5e1] overflow-hidden"
            id="services"
        >
            <ThreeLogoBackground />

            <div className="max-w-5xl mx-auto text-center mb-16">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {renderTitle()}
                    {/* What We <span className="text-blue-800">Do</span> */}
                </motion.h2>
                <motion.p
                    className="text-gray-600 text-lg mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    // UPDATED: Use decodedDescription and render with dangerouslySetInnerHTML
                    dangerouslySetInnerHTML={{ __html: decodedDescription || "Loading description..." }}
                >
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {services.reverse().map((service, i) => (
                    <motion.div
                        key={service._id || i}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
                        data-aos="fade-up"
                        data-aos-delay={i * 150}
                        whileHover={{ rotateY: 5 }}
                    >
                        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            {iconMap[service.icon] || <FaCode className="text-4xl text-blue-800" />}
                        </div>
                        {/* UPDATED: Decode the individual service title */}
                        <h3 className="text-xl font-semibold mb-2">{decode(service.title || "")}</h3>
                        {/* UPDATED: Decode the individual service description */}
                        <p className="text-gray-600">{decode(service.desc || "")}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
