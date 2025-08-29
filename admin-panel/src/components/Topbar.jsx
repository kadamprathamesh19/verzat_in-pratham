import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProfileModal from './AdminProfileModal';
import { useAdminContext } from '../context/AdminContext'; // ✅ CHANGED: Use the correct context
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Topbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { admin, logoutAdmin } = useAdminContext(); // ✅ CHANGED: Get 'admin' from AdminContext

  const handleLogout = () => {
    logoutAdmin(); // ✅ CHANGED: Use the logout function from the context
    toast.success("Logged out successfully!");
    navigate('/admin');
  };

  return (
    <div className="w-full h-16 bg-white shadow flex items-center px-6 justify-between">
      <Link to="/dashboard"><h1 className="text-2xl font-semibold">Admin Dashboard</h1></Link>

      <div className="flex items-center gap-4">
        {/* ✅ CHANGED: Check for 'admin' instead of 'adminUser' */}
        {admin && (
          <img
            // ✅ CHANGED: Use 'admin.profileImage'
            src={admin.profileImage || '/default-profile.jpg'}
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
          // ✅ CHANGED: Pass 'admin' as the prop
          adminData={admin}
          setIsModalOpen={setIsModalOpen}
        // The updateAdminData prop seems unused in the modal, but this is fine
        />
      )}
    </div>
  );
};

export default Topbar;