// src/context/BaseCompanyContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BaseCompanyContext = createContext();

export const BaseCompanyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch base description
  const getBaseDescription = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/base-description/description`);
      return res.data.description;
    } catch (err) {
      toast.error('Failed to fetch base description');
      return '';
    }
  };

  // Fetch all products
  const getCompanyProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/base-company-product`);
      return res.data;
    } catch (err) {
      toast.error('Failed to fetch company products');
      return [];
    }
  };

  return (
    <BaseCompanyContext.Provider
      value={{
        loading,
        getBaseDescription,
        getCompanyProducts,
      }}
    >
      {children}
    </BaseCompanyContext.Provider>
  );
};
