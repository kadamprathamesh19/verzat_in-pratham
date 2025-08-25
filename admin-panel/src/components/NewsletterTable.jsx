import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function NewsletterTable() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/newsletter`);
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      toast.error('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this subscriber?');
    if (!confirm) return;

    try {
      const res = await fetch(`${apiUrl}/api/admin/newsletter/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Subscriber deleted successfully');
        setSubscribers(prev => prev.filter(sub => sub._id !== id));
      } else {
        toast.error(result.message || 'Failed to delete subscriber');
      }
    } catch (err) {
      toast.error('Error deleting subscriber');
    }
  };

  if (loading) return <p>Loading newsletter subscribers...</p>;

  return (
    <div className="overflow-x-auto mt-8">
      <h1 className="text-3xl text-blue-700 font-bold text-center mb-10 mt-5">Subscribers Data</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Subscribed At</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {subscribers.map(sub => (
            <tr key={sub._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{sub.email}</td>
              <td className="py-3 px-6 text-left">{new Date(sub.createdAt).toLocaleString()}</td>
              <td className="py-3 px-6 text-left">
                <button
                  onClick={() => deleteSubscriber(sub._id)}
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
