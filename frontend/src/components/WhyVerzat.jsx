import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { fetchAboutDescription, fetchAboutValues } from "../services/aboutServices";

const WhyVerzat = () => {
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDesc, setAboutDesc] = useState("");
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state for video URL
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    const spotlight = document.getElementById("spotlight");
    const handleMouseMove = (e) => {
      if (spotlight) {
        spotlight.style.setProperty("--cursor-x", `${e.clientX}px`);
        spotlight.style.setProperty("--cursor-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const fetchData = async () => {
      try {
        const { title, description, videoUrl: fetchedVideoUrl } = await fetchAboutDescription();
        const valuesData = await fetchAboutValues();

        setAboutTitle(title);
        setAboutDesc(description);
        setValues(valuesData);

        // Set the video URL if present, fallback to default if you want
        if (fetchedVideoUrl) {
          setVideoUrl(fetchedVideoUrl);
        } else {
          setVideoUrl("/videos/why_verzat.mp4"); // fallback video path
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
        setVideoUrl("/videos/why_verzat.mp4"); // fallback video on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (loading) {
    return (
      <section className="text-white min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </section>
    );
  }

  // Render styled title as before
  const renderStyledTitle = (title) => {
    if (!title) return null;

    const words = title.trim().split(" ");
    const firstWord = words[0];
    const restWords = words.slice(1).join(" ");

    return (
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-white">{firstWord}</span>
        {restWords && <span className="text-blue-800"> {restWords}</span>}
      </h2>
    );
  };

  return (
    <section
      id="about"
      className="relative text-white py-24 min-h-screen px-4 sm:px-8 md:px-16 space-y-2 overflow-hidden"
    >
      {/* Background Video */}
      {videoUrl ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          key={videoUrl} // force reload if URL changes
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-black z-0" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20">
        <div className="text-center mb-10 max-w-4xl mx-auto">
          {renderStyledTitle(aboutTitle)}
          <p className="text-gray-300 text-lg leading-relaxed">{aboutDesc}</p>
        </div>

        {values.length === 0 ? (
          <p className="text-center text-gray-400">No values to display.</p>
        ) : (
          values.map((item, index) => (
            <div
              key={item._id || index}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-8 md:gap-24`}
            >
              {/* Text */}
              <div
                className="md:w-[45%] mt-5"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <h3 className="text-2xl font-semibold mb-3">
                  <span className="text-white">● </span>
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">{item.desc}</p>
              </div>

              {/* Image */}
              {item.image && (
                <div
                  className="md:w-[40%] w-full"
                  data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg shadow-lg w-full object-cover"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Cursor Spotlight */}
      <div className="cursor-spotlight" id="spotlight" />
    </section>
  );
};

export default WhyVerzat;
