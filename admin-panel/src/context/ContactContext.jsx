import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch current contact info on mount
  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/contact`);
        setContact(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to load contact info.');
        toast.error('Failed to load contact info.');
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  // Update contact info API call
  const updateContact = async (updatedData) => {
    setLoading(true);
    try {
      console.log("Updating contact with data:", updatedData);

      const res = await axios.put(`${apiUrl}/api/contact`, updatedData);
      setContact(res.data);
      setError(null);
      toast.success('Contact information updated successfully!');
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setError('Failed to update contact info.');
      toast.error('Failed to update contact info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{ contact, updateContact, loading, error }}
    >
      {children}
    </ContactContext.Provider>
  );
};
