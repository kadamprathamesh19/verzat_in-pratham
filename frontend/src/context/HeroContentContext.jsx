// src/context/HeroContentContext.jsx
import React, { createContext, useState, useEffect } from "react";
import * as heroService from "../services/heroService";

export const HeroContentContext = createContext();

export const HeroContentProvider = ({ children }) => {
    const [heroContent, setHeroContent] = useState({
        title: "",
        subtitle: "",
        videoUrl: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch hero content on mount
    useEffect(() => {
        async function fetchHeroContent() {
            try {
                const data = await heroService.getHeroContent();
                setHeroContent(data);
            } catch (err) {
                setError("Failed to load hero content.");
            } finally {
                setLoading(false);
            }
        }
        fetchHeroContent();
    }, []);

    // Update hero content
    const updateHero = async (newContent) => {
        try {
            const updated = await heroService.updateHeroContent(newContent);
            setHeroContent(updated);
        } catch (err) {
            setError("Failed to update hero content.");
            throw err; // re-throw if you want to handle in component
        }
    };

    return (
        <HeroContentContext.Provider value={{ heroContent, updateHero, loading, error }}>
            {children}
        </HeroContentContext.Provider>
    );
};
