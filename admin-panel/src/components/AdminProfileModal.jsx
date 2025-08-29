import React, { useState, useEffect, useRef } from 'react'; // ✅ 1. Import useRef
import { toast } from 'react-toastify';
import { useAdminContext } from '../context/AdminContext';

const AdminProfileModal = ({ adminData, setIsModalOpen }) => {
    const [formData, setFormData] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { updateAdminProfile, setAdmin } = useAdminContext();

    const modalRef = useRef(); // ✅ 2. Create a ref for the modal content

    useEffect(() => {
        if (adminData) setFormData(adminData);
    }, [adminData]);

    // ✅ 3. Add a useEffect to handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the ref exists and the click was outside the ref's element
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        // Add event listener when the modal mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the modal unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsModalOpen]); // Re-run effect if setIsModalOpen changes

    if (!formData) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        const result = await updateAdminProfile({
            name: formData.name,
            email: formData.email,
            password: newPassword || undefined,
        });

        if (result.success) {
            toast.success('Profile updated');
            setAdmin(result.updatedAdmin);
            setIsModalOpen(false);
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error(result.message || 'Failed to update profile');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            {/* ✅ 4. Attach the ref to the modal content div */}
            <div ref={modalRef} className="bg-white p-6 rounded-md w-[400px]">
                <h2 className="text-2xl text-center text-blue-700 font-bold mb-4">Edit Profile</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="newPassword" className="block mb-1 font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfileModal;