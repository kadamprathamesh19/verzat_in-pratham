import React, { useContext, useState, useEffect } from "react";
import { ServicesContext } from "../context/ServiceContext.jsx";
import { toast, ToastContainer } from "react-toastify";

import {
  FaRobot,
  FaBrain,
  FaCode,
  FaProjectDiagram,
  FaMicrochip,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaCloud,
} from "react-icons/fa";


const iconComponents = {
  FaRobot: <FaRobot />,
  FaBrain: <FaBrain />,
  FaCode: <FaCode />,
  FaProjectDiagram: <FaProjectDiagram />,
  FaMicrochip: <FaMicrochip />,
  FaLaptopCode: <FaLaptopCode />,
  FaServer: <FaServer />,
  FaDatabase: <FaDatabase />,
  FaNetworkWired: <FaNetworkWired />,
  FaCloud: <FaCloud />,
};

const iconOptions = Object.keys(iconComponents);

const ChangeServiceContent = () => {
  const {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    sectionDescription,
    fetchSectionDescription,
    updateSectionDescription,
    descLoading,
    sectionTitle,
    fetchSectionTitle,
    updateSectionTitle,
    titleLoading,
  } = useContext(ServicesContext);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    icon: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [tempDesc, setTempDesc] = useState("");
  const [tempTitle, setTempTitle] = useState("");


  const saveSectionTitle = async () => {
    if (!tempTitle || typeof tempTitle !== "string") {
      toast.error("Title is missing or invalid.");
      return;
    }

    const success = await updateSectionTitle(tempTitle);

    if (success) {
      toast.success("Page title updated successfully!");
    } else {
      toast.error("Failed to update page title.");
    }
  };



  const saveSectionDescription = async () => {
    if (!tempDesc || typeof tempDesc !== "string") {
      toast.error("Description is missing or invalid.");
      return;
    }

    const success = await updateSectionDescription(tempDesc);

    if (success) {
      toast.success("Description updated successfully!");
    } else {
      toast.error("Failed to update description.");
    }
  };


  useEffect(() => {
    fetchSectionTitle();
  }, []);

  useEffect(() => {
    setTempTitle(sectionTitle);
  }, [sectionTitle]);



  useEffect(() => {
    fetchSectionDescription(); // fetch on mount
  }, []);

  useEffect(() => {
    setTempDesc(sectionDescription); // update local when context updates
  }, [sectionDescription]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editingId
      ? updateService(editingId, formData)
      : addService(formData);

    action
      .then(() =>
        toast.success(
          editingId ? "Service updated successfully!" : "Service added successfully!"
        )
      )
      .catch(() =>
        toast.error(editingId ? "Failed to update service." : "Failed to add service.")
      );

    setEditingId(null);
    setFormData({ title: "", desc: "", icon: "" });
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      desc: service.desc,
      icon: service.icon,
    });
    setEditingId(service._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id)
        .then(() => toast.success("Service deleted successfully!"))
        .catch(() => toast.error("Failed to delete service."));
    }
  };

  return (
    <div className="p-8 max-w-4xl bg-white mx-auto">
      <h2 className="text-center text-3xl text-blue-700 mb-8 font-bold">Verzat Services Page</h2>

      {/* ******************************* Manage Page Title ********************************************* */}
      <div className="mb-6">
        <label className="block text-2xl font-bold mb-2">Service Page Title</label>
        <input
          type="text"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          className="w-full p-3 border rounded"
          placeholder="Enter a title for this service page..."
        />
        <button
          onClick={saveSectionTitle}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Title
        </button>

        {titleLoading && <p className="text-sm text-gray-500 mt-2">Loading title...</p>}
      </div>


      {/* ******************************* Manage Page Description ********************************************* */}
      <div className="mb-8">
        <label className="block text-2xl font-bold mb-2">
          Service Page Description
        </label>
        <textarea
          value={tempDesc}
          onChange={(e) => setTempDesc(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded resize-none"
          placeholder="Enter a general description about this service page..."
        />
        <button
          onClick={saveSectionDescription}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Description
        </button>

        {descLoading && <p className="text-sm text-gray-500 mt-2">Loading description...</p>}
      </div>



      {/* ******************************* Manage Service ********************************************* */}
      <h2 className="text-2xl font-bold mb-6">Manage Services</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          required
        />

        <div>
          <label className="block text-gray-700 mb-1">Select Icon</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          >
            <option value="">-- Choose an Icon --</option>
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>

          {formData.icon && (
            <div className="mt-2 text-xl flex items-center gap-2 text-gray-700">
              <span>Preview:</span> {iconComponents[formData.icon]}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {loading && <p>Loading services...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service._id} className="p-4 border rounded shadow-sm">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {iconComponents[service.icon]} {service.title}
            </h3>
            <p>{service.desc}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChangeServiceContent;
