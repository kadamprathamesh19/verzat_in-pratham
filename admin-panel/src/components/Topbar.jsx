import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProfileModal from './AdminProfileModal'; // Create this component
import { useUserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Topbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const { adminUser } = useUserContext()

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    toast.success("Logged out successfully!");
    navigate('/admin');
  };

  useEffect(() => {
    // Fetch admin data from local storage or an API
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setAdminData(adminUser);
  }, [adminUser]);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center px-6 justify-between">
      <Link to="/dashboard"><h1 className="text-2xl font-semibold">Admin Dashboard</h1></Link>

      <div className="flex items-center gap-4">

        {adminUser && (
          <img
            src={'/default-profile.jpg'} // fallback image
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border"
            onClick={() => setIsModalOpen(true)}
          />
        )}

        <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded">
          Logout
        </button>

      </div>

      {isModalOpen && (
        <AdminProfileModal
          adminData={adminData}
          setIsModalOpen={setIsModalOpen}
          updateAdminData={setAdminData}
        />
      )}
    </div>
  );
};

export default Topbar;
