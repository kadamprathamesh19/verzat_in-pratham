import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AboutContext = createContext();
export const useAbout = () => useContext(AboutContext);

export const AboutProvider = ({ children }) => {
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDesc, setAboutDesc] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchAboutContent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/about/description`);
      setAboutTitle(res.data.title || "");
      setAboutDesc(res.data.description || "");
      setVideoUrl(res.data.videoUrl || "");
    } catch (error) {
      console.error("Failed to fetch about content:", error);
    }
  };

  const updateAboutContent = async (newTitle, newDesc, newVideoUrl) => {
    try {
      const res = await axios.put(`${API_BASE}/api/about/description`, {
        title: newTitle,
        description: newDesc,
        videoUrl: newVideoUrl,
      });

      setAboutTitle(res.data.title || "");
      setAboutDesc(res.data.description || "");
      setVideoUrl(res.data.videoUrl || "");
    } catch (error) {
      console.error("Error updating about content:", error);
      throw error;
    }
  };

  const fetchValues = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/about/values`);
      setValues(res.data || []);
    } catch (error) {
      console.error("Failed to fetch about values:", error);
    }
  };

  const addValue = async (newValue) => {
    try {
      const res = await axios.post(`${API_BASE}/api/about/values`, newValue);
      setValues((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding value:", error);
      throw error;
    }
  };

  const updateValue = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_BASE}/api/about/values/${id}`, updatedData);
      setValues((prev) => prev.map((v) => (v._id === id ? res.data : v)));
    } catch (error) {
      console.error("Error updating value:", error);
      throw error;
    }
  };

  const deleteValue = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/about/values/${id}`);
      setValues((prev) => prev.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Error deleting value:", error);
      throw error;
    }
  };

  const fetchAboutData = async () => {
    setLoading(true);
    await Promise.all([fetchAboutContent(), fetchValues()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  return (
    <AboutContext.Provider
      value={{
        aboutTitle,
        aboutDesc,
        videoUrl,
        values,
        loading,
        updateAboutContent,
        addValue,
        updateValue,
        deleteValue,
      }}
    >
      {children}
    </AboutContext.Provider>
  );
};
