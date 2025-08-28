import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAdminContext } from '../context/AdminContext'; // ✅ correct import

const AdminProfileModal = ({ adminData, setIsModalOpen }) => {
    const [formData, setFormData] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { updateAdminProfile, setAdmin } = useAdminContext(); // ✅ using correct context

    useEffect(() => {
        if (adminData) setFormData(adminData);
    }, [adminData]);

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
            setAdmin(result.updatedAdmin); // ✅ update context
            setIsModalOpen(false);
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error(result.message || 'Failed to update profile');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

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
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfileModal;
