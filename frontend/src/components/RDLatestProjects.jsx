import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";


const cardVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    position: "absolute",
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.6, ease: "easeInOut" },
  }),
};

export default function RDProjectsSection() {
  const [productsData, setProductsData] = useState([]);
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionTitle, setSectionTitle] = useState("Verzat R&D Lab"); // fallback
  const [sectionBgImage, setSectionBgImage] = useState(null);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get(`${apiUrl}/api/latest-products`);

        // Fetch latest description, title, and background image
        const descRes = await axios.get(`${apiUrl}/api/latest-description`);

        setProductsData(productsRes.data);

        if (descRes.data) {
          setSectionDescription(descRes.data.description || "");
          setSectionTitle(descRes.data.sectionTitle || "Verzat R&D Lab");
          setSectionBgImage(descRes.data.sectionImage || null);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load project data or description.");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isPaused || productsData.length === 0) return;
    const timer = setInterval(() => handleChange(1), 5000);
    return () => clearInterval(timer);
  }, [isPaused, productsData]);

  const handleChange = (dir) => {
    if (!productsData.length) return;
    setDirection(dir);
    setIndex((prev) => (prev + dir + productsData.length) % productsData.length);
  };

  // Split the title: first word black, rest blue
  const splitTitle = () => {
    const words = sectionTitle.trim().split(" ");
    if (words.length === 0) return null;
    const firstWord = words[0];
    const rest = words.slice(1).join(" ");
    return { firstWord, rest };
  };

  const { firstWord, rest } = splitTitle() || { firstWord: "", rest: "" };

  return (
    <section
      id="products"
      className="relative min-h-screen py-16 px-4 sm:px-6 flex flex-col items-center justify-start overflow-hidden mt-10"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center brightness-90 blur-sm"
        style={{
          backgroundImage: sectionBgImage
            ? `url(${sectionBgImage})`
            : `url(/default-bg.avif)`,
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="max-w-4xl text-center mb-5 backdrop-blur-xl bg-white/40 rounded-xl p-8 shadow-xl border border-white/20">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            <span className="text-black">{firstWord}</span>{" "}
            <span className="text-blue-600">{rest}</span>
          </h2>
          {sectionDescription && (
            <p className="text-gray-900 text-md mb-4 whitespace-pre-line">
              {sectionDescription}
            </p>
          )}
          {productsData.length > 0 && (
            <p className="text-blue-700 text-md font-semibold">
              Currently showcasing{" "}
              {productsData.length === 1 ? "one product" : `${productsData.length} flagship products`}
              :{" "}
              {productsData.map((p, i) => (
                <span key={p._id || p.id}>
                  {p.title}
                  {i < productsData.length - 2 ? ", " : ""}
                  {i === productsData.length - 2 ? " & " : ""}
                </span>
              ))}
              .
            </p>
          )}
        </div>

        {/* Product carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full max-w-6xl h-auto min-h-[40rem] flex items-center group overflow-hidden mt-5 mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={() => handleChange(-1)}
            className="absolute left-2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <HiChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleChange(1)}
            className="absolute right-2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <HiChevronRight size={24} />
          </button>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full rounded-lg p-4 sm:p-6 flex flex-col justify-between shadow-xl max-h-[90vh] overflow-hidden border"
            >
              {productsData[index] && (
                <>
                  <div className="overflow-y-auto pr-2 max-h-[75vh]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4 sm:px-6 py-8 sm:py-10 text-center md:text-left bg-white text-black rounded-lg shadow-md">
                      <div className="md:w-1/2 w-full flex justify-center mb-6 md:mb-0">
                        <img
                          src={productsData[index].image}
                          alt={productsData[index].title}
                          className="w-full max-w-xs mx-auto"
                        />
                      </div>
                      <div className="md:w-1/2 w-full">
                        <h2 className="text-4xl font-bold text-blue-700 mb-4">
                          {productsData[index].title}
                        </h2>
                        <p className="text-sm text-gray-800 mb-3 leading-relaxed">
                          {productsData[index].description}
                        </p>
                        <p className="text-lg font-semibold mb-2 text-blue-700">
                          Key features include:
                        </p>
                        <ul className="text-base text-black space-y-1 text-left">
                          {productsData[index].features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 mb-6">
                    <button
                      onClick={() => {
                        const link = productsData[index]?.link;
                        if (!link || !link.startsWith("http")) {
                          toast.info("Link not available or coming soon!");
                          return;
                        }

                        window.open(link, "_blank", "noopener,noreferrer");
                      }}
                      className={`inline-block px-6 py-2 rounded-md font-semibold ${
                        productsData[index]?.link && productsData[index].link.startsWith("http")
                          ? "bg-blue-800 hover:bg-blue-700"
                          : "bg-blue-400 cursor-not-allowed"
                      } text-white transition`}
                      disabled={!productsData[index]?.link || !productsData[index].link.startsWith("http")}
                    >
                      Learn More →
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
