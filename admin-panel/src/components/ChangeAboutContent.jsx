import React, { useState, useEffect } from "react";
import { useAbout } from "../context/AboutContext.jsx";
import { toast } from "react-toastify";

const ChangeAboutContent = () => {
  const {
    aboutTitle,
    aboutDesc,
    videoUrl,
    values,
    loading,
    updateAboutContent,
    addValue,
    updateValue,
    deleteValue,
  } = useAbout();

  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [newValue, setNewValue] = useState({ title: "", desc: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState("");

  const CLOUDINARY_UPLOAD_PRESET = "admin_video_upload";
  const CLOUDINARY_CLOUD_NAME = "dxojrxx85";

  useEffect(() => {
    setTitleInput(aboutTitle);
    setDescInput(aboutDesc);
    setNewVideoUrl(videoUrl);
  }, [aboutTitle, aboutDesc, videoUrl]);

  const handleSaveAboutContent = async () => {
    try {
      await updateAboutContent(titleInput, descInput, newVideoUrl);
      toast.success("About content updated!");
    } catch (error) {
      toast.error("Failed to update About content.");
    }
  };


  const handleVideoUpload = async (file) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("video", file); // backend expects 'video' here

    try {
      const res = await fetch("http://localhost:5000/api/about/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.videoUrl) {
        setNewVideoUrl(data.videoUrl);
        toast.success("Video uploaded successfully!");
      } else {
        toast.error("Video upload failed: no URL returned.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Video upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Image upload stays the same since it already calls your backend route with 'image' field
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file); // backend expects 'image'

    try {
      setUploading(true);
      const res = await fetch("http://localhost:5000/api/about/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.imageUrl) {
        setNewValue((prev) => ({ ...prev, image: data.imageUrl }));
        toast.success("Image uploaded!");
      } else {
        toast.error("No image URL returned.");
      }
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };


  const handleSubmitValue = async () => {
    if (!newValue.title || !newValue.desc || !newValue.image) {
      toast.warn("Fill in all fields.");
      return;
    }

    try {
      if (editingId) {
        await updateValue(editingId, newValue);
        toast.success("Value updated.");
      } else {
        await addValue(newValue);
        toast.success("Value added.");
      }
      setNewValue({ title: "", desc: "", image: "" });
      setEditingId(null);
    } catch (error) {
      toast.error("Save failed.");
    }
  };

  const handleEditClick = (item) => {
    setNewValue({ title: item.title, desc: item.desc, image: item.image });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info(`Editing "${item.title}"`);
  };

  const handleDeleteValue = async (id) => {
    if (!window.confirm("Delete this value?")) return;

    try {
      await deleteValue(id);
      toast.success("Value deleted.");
      if (editingId === id) {
        setEditingId(null);
        setNewValue({ title: "", desc: "", image: "" });
      }
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  if (loading) return <div className="text-center text-lg text-gray-600">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <h2 className="text-3xl text-center text-blue-700 font-bold mb-8">Verzat About Page</h2>

      {/* Title + Description Section */}
      <div className="mb-10">
        <label className="block text-2xl font-semibold mb-2">About Title</label>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="w-full p-3 border rounded"
        />

        <label className="block text-2xl font-semibold mt-6 mb-2">About Description</label>
        <textarea
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
          className="w-full p-3 border rounded"
          rows={5}
        />

        <div className="mb-4 mt-6">
          <label className="block mb-2 text-2xl font-medium">Upload Background Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleVideoUpload(file);
            }}
          />
          {uploading && <p className="text-blue-600 mt-2">Uploading video...</p>}
        </div>

        {newVideoUrl && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Video Preview</label>
            <video
              src={newVideoUrl}
              controls
              width="100%"
              className="rounded shadow"
            />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSaveAboutContent}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setTitleInput(aboutTitle || "");
              setDescInput(aboutDesc || "");
              setNewVideoUrl(videoUrl || "");
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Add/Edit Value Section */}
      <div className="mb-10 border-t pt-6">
        <h3 className="text-2xl font-semibold mb-2">
          {editingId ? "Edit Value" : "Add New Value"}
        </h3>

        <input
          type="text"
          placeholder="Title"
          value={newValue.title}
          onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={newValue.desc}
          onChange={(e) => setNewValue({ ...newValue, desc: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
          rows={3}
        />

        <label className="block text-2xl font-semibold mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload(file);
          }}
          className="block w-full mb-2 p-2 border rounded"
        />

        {uploading && <p className="text-sm text-blue-600">Uploading...</p>}

        {newValue.image && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">Image Preview:</p>
            <img
              src={newValue.image}
              alt="Preview"
              className="mt-2 max-w-xs h-auto rounded shadow"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSubmitValue}
            className={`px-4 py-2 text-white rounded ${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}
          >
            {editingId ? "Update Value" : "Add Value"}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setNewValue({ title: "", desc: "", image: "" });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Display Values */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Existing Values</h3>
        {values.length === 0 ? (
          <p>No values available.</p>
        ) : (
          values.map((item) => (
            <div key={item._id} className="mb-4 p-4 border rounded bg-gray-50">
              <p className="text-lg font-bold mb-1">{item.title}</p>
              <p className="text-gray-700 mb-2">{item.desc}</p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-auto rounded mb-3 shadow"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteValue(item._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChangeAboutContent;
