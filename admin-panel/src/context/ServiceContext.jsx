// ServicesContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Section Title & Description
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [descLoading, setDescLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState(false);

  // ********************************************************************************************************
  // SECTION TITLE API
  const fetchSectionTitle = async () => {
    setTitleLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/service-description/title`);
      const data = await res.json();
      setSectionTitle(data.title || "");
    } catch (err) {
      console.error("Failed to load section title:", err);
    } finally {
      setTitleLoading(false);
    }
  };

  const updateSectionTitle = async (newTitle) => {
    try {
      const res = await fetch(`${apiUrl}/api/service-description/title`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) throw new Error("Failed to update title");

      setSectionTitle(newTitle);
      return true;
    } catch (err) {
      console.error("Failed to update section title:", err);
      return false;
    }
  };

  // ********************************************************************************************************
  // SECTION DESCRIPTION API
  const fetchSectionDescription = async () => {
    setDescLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/service-description/description`);
      const data = await res.json();
      setSectionDescription(data.description || "");
    } catch (err) {
      console.error("Failed to load section description:", err);
    } finally {
      setDescLoading(false);
    }
  };

  const updateSectionDescription = async (newDescription) => {
    try {
      const res = await fetch(`${apiUrl}/api/service-description/description`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDescription }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setSectionDescription(newDescription);
      return true;
    } catch (err) {
      console.error("Failed to update section description:", err);
      return false;
    }
  };

  // ********************************************************************************************************
  // SERVICE CRUD
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/services`);
      setServices(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  const addService = async (newService) => {
    try {
      const res = await axios.post(`${apiUrl}/api/services`, newService);
      setServices((prev) => [...prev, res.data]);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const updateService = async (id, updatedService) => {
    try {
      const res = await axios.put(`${apiUrl}/api/services/${id}`, updatedService);
      setServices((prev) =>
        prev.map((service) => (service._id === id ? res.data : service))
      );
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/services/${id}`);
      setServices((prev) => prev.filter((service) => service._id !== id));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        error,
        fetchServices,
        addService,
        updateService,
        deleteService,

        // Description
        sectionDescription,
        fetchSectionDescription,
        updateSectionDescription,
        descLoading,

        // Title
        sectionTitle,
        fetchSectionTitle,
        updateSectionTitle,
        titleLoading,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
