import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from '../context/ContactContext';

const ChangeContact = () => {
  const { contact, updateContact, loading, error } = useContext(ContactContext);

  const [formData, setFormData] = useState({
    pageTitle: '',
    address: '',
    email: '',
    phone: '',
    mapEmbedUrl: '',  // Changed to mapEmbedUrl to match backend
  });

  // Populate form when contact data loads
  useEffect(() => {
    if (contact) {
      setFormData({
        pageTitle: contact.pageTitle || '',
        address: contact.address || '',
        email: contact.email || '',
        phone: contact.phone || '',
        mapEmbedUrl: contact.mapEmbedUrl || '',  // match backend field
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContact(formData);  // sending mapEmbedUrl now
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg text-gray-800">
      <h2 className="text-3xl text-center text-blue-700 font-bold mb-6">Verzat Contact Information</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Page Title */}
        <div>
          <label htmlFor="pageTitle" className="block mb-1 font-semibold">Page Title</label>
          <input
            id="pageTitle"
            name="pageTitle"
            type="text"
            value={formData.pageTitle}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block mb-1 font-semibold">Address</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white border border-gray-600 focus:outline-none"
            required
          />
        </div>

        {/* Google Map Embed HTML */}
        <div>
          <label htmlFor="mapEmbedUrl" className="block mb-1 font-semibold">
            Google Map Embed HTML
          </label>
          <textarea
            id="mapEmbedUrl"
            name="mapEmbedUrl"
            rows={6}
            value={formData.mapEmbedUrl}
            onChange={handleChange}
            placeholder={`<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`}
            className="w-full p-2 rounded bg-white border border-gray-600 focus:outline-none"
            required
          />
          <small className="text-gray-800">
            Paste the full iframe embed code here (from Google Maps Share → Embed a map)
          </small>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 transition rounded py-2 font-semibold"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default ChangeContact;
