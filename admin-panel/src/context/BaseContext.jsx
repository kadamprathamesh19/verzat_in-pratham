import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BaseContext = createContext();

export const BaseProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Add or update base description
  const addBaseDescription = async (description) => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/base-description`, { description });
      toast.success('Description saved successfully!');
    } catch (error) {
      console.error('Error saving description:', error);
      toast.error('Failed to save description.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch base description
  const getBaseDescription = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/base-description/description`);
      const data = await res.json();
      return data?.description || '';
    } catch (err) {
      console.error('Error fetching description:', err);
      toast.error('Failed to load description.');
      return '';
    }
  };

  // Add new company product
  const addCompanyProduct = async (formData) => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/base-company-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products
  const getCompanyProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/base-company-product`);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Update existing product by id
  const updateCompanyProduct = async (id, formData) => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/api/base-company-product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  // Delete product by id
  const deleteCompanyProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${apiUrl}/api/base-company-product/${id}`);
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseContext.Provider
      value={{
        addBaseDescription,
        getBaseDescription,
        addCompanyProduct,
        getCompanyProducts,
        updateCompanyProduct,
        deleteCompanyProduct,
        loading,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};
