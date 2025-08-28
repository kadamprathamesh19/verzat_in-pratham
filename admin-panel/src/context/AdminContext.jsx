import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();
export const useAdminContext = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('adminToken');

    // Fetch admin profile on load (optional)
    useEffect(() => {
        if (token) {
            fetchAdminProfile();
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch admin profile
    const fetchAdminProfile = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/admin/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (res.ok) {
                setAdmin(data.admin); // Adjust if your API returns different format
            } else {
                setAdmin(null);
            }
        } catch (err) {
            console.error('Failed to fetch admin profile:', err);
        } finally {
            setLoading(false);
        }
    };

    // Login admin
    const loginAdmin = async (email, password) => {
        const res = await fetch(`${apiUrl}/api/admin/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('adminToken', data.token);
            setAdmin(data.admin);
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
    };

    // Update admin profile
    const updateAdminProfile = async (profileData) => {
        const res = await fetch(`${apiUrl}/api/admin/profile/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        const data = await res.json();

        if (res.ok) {
            setAdmin(data.updatedAdmin);
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
    };

    // Logout admin
    const logoutAdmin = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    return (
        <AdminContext.Provider
            value={{
                admin,
                loading,
                loginAdmin,
                updateAdminProfile,
                logoutAdmin,
                fetchAdminProfile,
                setAdmin,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export { AdminProvider };

