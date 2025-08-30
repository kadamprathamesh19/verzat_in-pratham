import React, { useContext, useEffect, useState, useMemo } from "react"; // UPDATED: Added useMemo
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BaseCompanyContext } from "../context/BaseCompanyContext";
import { decode } from "html-entities"; // UPDATED: Added decoder

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 5000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  pauseOnHover: false,
  responsive: [
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const ParentCompanySection = () => {
  const { getBaseDescription, getCompanyProducts } = useContext(BaseCompanyContext);
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);

  // UPDATED: Decode the main description using useMemo for efficiency
  const decodedDescription = useMemo(() => decode(description || ""), [description]);

  useEffect(() => {
    const fetchData = async () => {
      const desc = await getBaseDescription();
      const prods = await getCompanyProducts();
      setDescription(desc);
      setProducts(prods);
    };
    fetchData();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white text-black py-5 px-6">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80 bg-blur-lg"
      >
        <source src="/Parent_Product/Bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo */}
        <a href="https://verzat.com/" target="_blank" rel="noopener noreferrer" >
          <img src="/Parent_Verzat-NoBg.png" alt="Verzat Technologies" className="h-[100px] mx-auto" />
        </a>

        {/* Company Intro */}
        <div className="text-black font-medium text-sm sm:text-base leading-relaxed max-w-5xl mx-auto mt-4 p-6 sm:p-8 rounded-xl shadow-md bg-white border border-gray-200 ring-1 ring-gray-100">
          {/* UPDATED: Use dangerouslySetInnerHTML to render the decoded description */}
          <p dangerouslySetInnerHTML={{ __html: decodedDescription }} />
        </div>

        {/* Product Carousel */}
        <div>
          <h3 className="text-2xl font-semibold text-blue mt-16 mb-8">Explore Our Verzat Product Suite</h3>
          <Slider {...sliderSettings}>
            {products.map((p, idx) => (
              <div key={idx} className="px-4">
                <div className="text-center px-4">
                  <motion.img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-60 h-60 sm:w-60 sm:h-64 object-contain mx-auto mb-[-20px] transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 180 }}
                  />
                  {/* UPDATED: Decode product name */}
                  <h4 className="text-xl sm:text-2xl font-bold text-blue mb-1">{decode(p.name || "")}</h4>
                  {/* UPDATED: Decode product longform description */}
                  <p className="text-sm sm:text-base text-black">{decode(p.longform || "")}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Animated Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => window.open("https://verzat.com/", "_blank")}
            className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-blue-700 text-lg tracking-wide rounded-xl bg-blue-700 overflow-hidden group border-2 border-blue-700
               transition-transform duration-300 ease-in-out
               hover:scale-105 active:scale-95"
          >
            <span className="absolute left-[-10%] top-0 w-[120%] h-full bg-white transform skew-x-[30deg] transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.8,1)] group-hover:translate-x-full rounded-xl z-10" />
            <span className="relative z-20 inline-flex font-semibold items-center text-blue-700 group-hover:text-blue-100 transition-colors duration-500">
              Explore Verzat
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-3 w-6 h-6 stroke-current stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section >
  );
};

export default ParentCompanySection;
