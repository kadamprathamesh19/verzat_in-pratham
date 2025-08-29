import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();
export const useAdminContext = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch admin profile on load if token exists
  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (t) {
      fetchAdminProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Helper to get latest token
  const getToken = () => localStorage.getItem('adminToken');

  // Fetch admin profile (protected)
  const fetchAdminProfile = async () => {
    try {
      const t = getToken();
      if (!t) {
        setAdmin(null);
        setLoading(false);
        return;
      }
      const res = await fetch(`${apiUrl}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await safeJson(res);

      if (res.ok) {
        setAdmin(data.admin);
      } else {
        setAdmin(null);
      }
    } catch (err) {
      console.error('Failed to fetch admin profile:', err);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  // Login admin (unprotected)
  const loginAdmin = async (email, password) => {
    const res = await fetch(`${apiUrl}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await safeJson(res);

    if (res.ok && data?.token) {
      localStorage.setItem('adminToken', data.token);
      setAdmin(data.admin || null);
      return { success: true };
    } else {
      return { success: false, message: data?.message || 'Login failed' };
    }
  };

  // Update admin profile (protected)
  const updateAdminProfile = async (profileData) => {
    const t = getToken();
    if (!t) return { success: false, message: 'Not authenticated' };

    const res = await fetch(`${apiUrl}/api/admin/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await safeJson(res);

    if (res.ok) {
      setAdmin(data.updatedAdmin);
      // ✅ CORRECTED LINE: Return the updated admin data
      return { success: true, updatedAdmin: data.updatedAdmin };
    } else {
      return { success: false, message: data?.message || 'Update failed' };
    }
  };

  // Logout admin
  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  // Safe JSON helper to avoid crashes on empty bodies
  const safeJson = async (res) => {
    try { return await res.json(); } catch { return null; }
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