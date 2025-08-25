import React from 'react';
import { useMissionVision } from '../context/MissionVisionContext.jsx'; // Adjust path as needed

// --- Reusable Component for Mission/Vision Section ---
const ContentSection = ({ title, data, onDataChange, colorClass }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (data.imageFile) {
        URL.revokeObjectURL(data.imagePreview);
      }
      onDataChange('imageFile', file);
      onDataChange('imagePreview', URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex-1 bg-white shadow-lg p-6 rounded-xl border border-gray-200">
      <h2 className={`text-2xl font-bold mb-5 ${colorClass}`}>{title}</h2>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title} Image
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />

      {data.imagePreview && (
        <img
          src={data.imagePreview}
          alt={`${title} Preview`}
          className="w-full h-48 object-cover mb-4 rounded-lg border"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
        />
      )}

      <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
        {title} Title
      </label>
      <input
        type="text"
        value={data.title}
        onChange={(e) => onDataChange('title', e.target.value)}
        placeholder={`${title} Title`}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title} Description
      </label>
      <textarea
        value={data.description}
        onChange={(e) => onDataChange('description', e.target.value)}
        placeholder={`${title} Description`}
        rows="6"
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        required
      />
    </div>
  );
};


// --- Main UI Component ---
const ChangeMissionVisionContent = () => {
  const {
    missionData,
    visionData,
    isSubmitting,
    isFetching,
    handleMissionChange,
    handleVisionChange,
    handleSubmit,
  } = useMissionVision();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-600">Loading Content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Verzat Mission & Vision</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            <ContentSection
              title="Mission"
              data={missionData}
              onDataChange={handleMissionChange}
              colorClass="text-blue-600"
            />
            <ContentSection
              title="Vision"
              data={visionData}
              onDataChange={handleVisionChange}
              colorClass="text-blue-600"
            />
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeMissionVisionContent;
