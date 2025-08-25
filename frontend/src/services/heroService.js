// src/services/heroService.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/hero";

export const getHeroContent = async () => {
  const response = await axios.get(`${API_BASE}/hero-content`);
  return response.data;
};

export const updateHeroContent = async (content) => {
  const response = await axios.put(`${API_BASE}/hero-content-update`, content);
  return response.data;
};
