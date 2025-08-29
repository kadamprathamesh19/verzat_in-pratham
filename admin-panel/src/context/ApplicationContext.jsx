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

    // ✅ Helper to get the latest token from localStorage
    const getToken = () => localStorage.getItem('adminToken');

    // Fetch all applications from your backend
    const getAllApplications = async () => {
        try {
            setLoading(true);
            const token = getToken(); // ✅ Get the token
            if (!token) {
                // If there's no token, we can't fetch data.
                throw new Error('Admin token not found.');
            }

            // ✅ Send the token in the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            
            const response = await axios.get(`${apiUrl}/api/admin/applications`, config);
            
            setApplications(response.data);
            setError(null);
            return response.data; // ✅ RETURN THE DATA to prevent the crash

        } catch (err) {
            setError('Failed to fetch applications');
            console.error(err);
            setApplications([]); // Reset to empty array on error
            return [];           // ✅ RETURN AN EMPTY ARRAY on error to prevent crashes
        } finally {
            setLoading(false);
        }
    };

    // Delete applications from your backend
    const deleteApplication = async (id) => {
        try {
            const token = getToken(); // ✅ Also need token for deleting
            if (!token) {
                throw new Error('Admin token not found.');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.delete(`${apiUrl}/api/admin/applications/${id}`, config);
            await getAllApplications(); // Refresh list
        } catch (err) {
            console.error('Failed to delete application:', err);
            alert('Failed to delete application. Please try again.');
        }
    };


    // Fetch on mount
    useEffect(() => {
        // We only want to fetch if a token exists, otherwise wait for login.
        if (getToken()) {
            getAllApplications();
        } else {
            setLoading(false); // If no token, we're not loading anything.
        }
    }, []);

    return (
        <ApplicationContext.Provider value={{ applications, loading, error, refetch: getAllApplications, deleteApplication }}>
            {children}
        </ApplicationContext.Provider>
    );
};

// Custom hook for easier use
export const useApplications = () => useContext(ApplicationContext);