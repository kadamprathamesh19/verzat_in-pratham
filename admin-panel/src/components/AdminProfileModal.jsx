import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';

const AdminProfileModal = ({ adminData, setIsModalOpen, updateAdminData }) => {
    const [formData, setFormData] = useState(null);
    const { setAdminUser } = useUserContext();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (adminData) setFormData(adminData);
    }, [adminData]);

    if (!formData) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('/api/admin/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                updateAdminData(result.updatedAdmin);
                localStorage.setItem('user', JSON.stringify(result.updatedAdmin));
                setIsModalOpen(false);
                setAdminUser(result.updatedAdmin);
                toast.success("Profile updated successfully!");
            } else {
                toast.error(result.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Update Error:', error);
            toast.error('An error occurred.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
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
