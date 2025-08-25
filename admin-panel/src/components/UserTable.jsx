import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../context/UserContext';

export default function UserTable() {
  const { users, setUsers, fetchUsers } = useUserContext();
  // const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('User deleted successfully');
        setUsers(prev => prev.filter(user => user._id !== id));
      } else {
        toast.error(result.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Something went wrong!');
    }
  };

  const promoteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/promote/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        // Update the user in the state
        setUsers(prev =>
          prev.map(user =>
            user._id === id ? { ...user, isAdmin: true } : user
          )
        );
      } else {
        toast.error(result.message || 'Failed to promote user');
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      toast.error('Something went wrong while promoting user');
    }
  };

  const demoteUser = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/demote/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setUsers(prev =>
          prev.map(user =>
            user._id === id ? { ...user, isAdmin: false } : user
          )
        );
      } else {
        toast.error(result.message || 'Failed to demote user');
      }
    } catch (error) {
      console.error('Error demoting user:', error);
      toast.error('Something went wrong while demoting user');
    }
  };


  // if (loading) return <p>Loading users...</p>;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl text-blue-700 font-bold text-center mb-10 mt-5">Users Data</h1>

      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">
                {user.isAdmin ? (
                  <span className="text-green-600 font-semibold">Admin</span>
                ) : (
                  <span className="text-gray-600">User</span>
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="py-3 px-6 text-left flex gap-2 flex-wrap">
                {user.isAdmin ? (
                  <button
                    onClick={() => demoteUser(user._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Make User
                  </button>
                ) : (
                  <button
                    onClick={() => promoteUser(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Make Admin
                  </button>
                )}

                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
