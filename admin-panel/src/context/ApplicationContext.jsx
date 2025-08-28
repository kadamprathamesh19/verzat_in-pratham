// src/context/ApplicationContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context
const ApplicationContext = createContext();

// Create provider
export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch all applications from your backend
    const getAllApplications = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/api/admin/applications`); // Update to your actual API endpoint
            setApplications(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch applications');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Delete applications from your backend
    const deleteApplication = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/admin/applications/${id}`); // Replace with your actual API endpoint
            await getAllApplications(); // Refresh list
        } catch (err) {
            console.error('Failed to delete application:', err);
            alert('Failed to delete application. Please try again.');
        }
    };


    // Fetch on mount
    useEffect(() => {
        getAllApplications();
    }, []);

    return (
        <ApplicationContext.Provider value={{ applications, loading, error, refetch: getAllApplications, deleteApplication }}>
            {children}
        </ApplicationContext.Provider>
    );
};

// Custom hook for easier use
export const useApplications = () => useContext(ApplicationContext);
