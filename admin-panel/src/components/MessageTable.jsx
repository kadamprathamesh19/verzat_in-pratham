import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function MessageTable() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${apiUrl}/api/admin/messages/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Message deleted successfully');
        // Auto-refresh the table
        setMessages(prev => prev.filter(msg => msg._id !== id));
      } else {
        toast.error(result.message || 'Failed to delete message');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting message');
    }
  };

  if (loading) return <p>Loading messages...</p>;

  return (
    <div className="overflow-x-auto mt-8">
      <h1 className="text-3xl text-blue-700 font-bold text-center mb-10 mt-5">Messages Data</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Message</th>
            <th className="py-3 px-6 text-left">Sent At</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {messages.map(msg => (
            <tr key={msg._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{msg.name}</td>
              <td className="py-3 px-6 text-left">{msg.email}</td>
              <td className="py-3 px-6 text-left max-w-xs truncate">{msg.message}</td>
              <td className="py-3 px-6 text-left">{new Date(msg.createdAt).toLocaleString()}</td>
              <td className="py-3 px-6 text-left">
                <button
                  onClick={() => deleteMessage(msg._id)}
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
