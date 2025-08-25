// src/api/servicesApi.js

const BASE_URL = "http://localhost:5000/api"; // or from .env file

export const fetchServices = async () => {
    try {
        const response = await fetch(`${BASE_URL}/services`);
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API error:", error);
        return [];
    }
};


export const fetchSectionDescription = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/service-description/description");
    if (!res.ok) throw new Error("Failed to fetch description");
    const data = await res.json();
    return data.description;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSectionTitle = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/service-description/title");
    if (!res.ok) throw new Error("Failed to fetch title");
    const data = await res.json();
    return data.title;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
