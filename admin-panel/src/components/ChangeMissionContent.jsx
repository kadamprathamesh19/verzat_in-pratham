import React, { useState } from 'react';

const ChangeMissionContent = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/api/mission', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Mission content updated successfully!');
        setImage(null);
        setTitle('');
        setDescription('');
        setPreview(null);
      } else {
        alert('Failed to update mission content');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating content');
    }
  };

  return (
    <div className="change-mission-content" style={{ padding: '2rem' }}>
      <h2>Update Mission Section</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '1rem' }}>
          <label>Upload New Mission Image:</label><br />
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Mission"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="6"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button type="submit" style={{ padding: '0.6rem 1.2rem' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default ChangeMissionContent;
