// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const token = localStorage.getItem('adminToken');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch users');

      const data = await res.json();
      setUsers(data);

      if (token) {
        const decoded = jwtDecode(token);
        const currentAdmin = data.find(user => user.email === decoded.email);
        setAdminUser(currentAdmin);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        adminUser,
        setAdminUser,
        fetchUsers, // expose fetch method to refresh from anywhere
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
