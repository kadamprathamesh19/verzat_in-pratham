// src/services/heroService.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getHeroContent = async () => {
  const response = await axios.get(`${apiUrl}/api/hero-content`);
  return response.data;
};

export const updateHeroContent = async (content) => {
  const response = await axios.put(`${apiUrl}/api/hero-content-update`, content);
  return response.data;
};
