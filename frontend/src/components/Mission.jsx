import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import missionImage from '../assets/mission-icon.png';
import visionImage from '../assets/vision-icon.png'; // Your logo-style images

const Mission = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section id="mission" className="bg-white text-[#111] py-24 px-6 md:px-12 ">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* Vision Section - Image Left, Text Right */}
                <div
                    className="flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-12 bg-white shadow-lg rounded-xl p-6 min-h-[300px] md:min-h-[360px]"
                    data-aos="fade-up"
                >
                    {/* Logo */}
                    <div className="md:w-1/3 flex justify-center items-center">
                        <img
                            src={missionImage}
                            alt="Mission"
                            className="w-[240px] h-[240px] object-contain"
                        />
                    </div>

                    {/* Text Card */}
                    {/* Text Card */}
                    <div className="md:w-2/3 relative bg-white rounded-md p-6 shadow-md">
                        <h2 className="text-4xl font-bold text-[#1a1a7f] mb-4">Mission</h2>
                        <p className="text-md text-[#333] leading-relaxed">
                            To drive innovation through research-led software engineering and intelligent system development.
                            We are committed to building scalable, efficient, and future-ready technology solutions that solve real-world challenges — while fostering a culture of experimentation, integrity, and continuous learning.

                        </p>
                    </div>

                </div>

                {/* Mission Section - Text Left, Image Right */}
                <div
                    className="flex flex-col md:flex-row-reverse items-center justify-between space-y-10 md:space-y-0 md:space-x-12 bg-white shadow-lg rounded-xl p-6 min-h-[300px] md:min-h-[360px]"
                    data-aos="fade-up"
                >
                    {/* Logo */}
                    <div className="md:w-1/3 flex justify-center items-center">
                        <img
                            src={visionImage}
                            alt="Vision"
                            className="w-[240px] h-[240px] object-contain"
                        />
                    </div>

                    {/* Text Card */}
                    {/* Text Card */}
                    <div className="md:w-2/3 relative bg-white rounded-md p-6 shadow-md">
                        <h2 className="text-4xl font-bold text-[#1a1a7f] mb-4">Vision</h2>
                        <p className="text-md text-[#333] leading-relaxed">
                            To become a global leader in research-driven technology innovation by developing intelligent, future-ready solutions that shape the next generation of software development and digital transformation.
                            We envision a world where technology not only solves complex problems but also drives progress — and we strive to lead that evolution through continuous learning, bold experimentation, and purpose-driven innovation.

                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Mission;
