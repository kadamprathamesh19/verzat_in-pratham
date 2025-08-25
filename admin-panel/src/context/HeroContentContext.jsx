import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HeroContentContext = createContext();

export const HeroContentProvider = ({ children }) => {
  // Hero content state
  const [heroContent, setHeroContent] = useState({
    title: "",
    subtitle: "",
    videoUrl: "",
  });

  // Fetch hero content from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hero/hero-content")
      .then((res) => {
        setHeroContent(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch hero content:", err);
      });
  }, []);

  // Update hero content in backend
  const updateHeroContent = async (newContent) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/hero/hero-content-update",
        newContent
      );
      setHeroContent(res.data);
    } catch (err) {
      console.error("Failed to update hero content:", err);
    }
  };

  return (
    <HeroContentContext.Provider
      value={{
        heroContent,
        updateHeroContent,
      }}
    >
      {children}
    </HeroContentContext.Provider>
  );
};
