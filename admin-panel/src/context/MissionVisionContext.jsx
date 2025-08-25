import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

// === API Logic (directly inside this file) ===
const apiUrl = import.meta.env.VITE_API_URL;
const BASE_URL = `${apiUrl}/api/mission-vision`; // Update if deploying

const apiService = {
  getMissionVision: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch mission/vision data');
    return await res.json();
  },

  updateMissionVision: async (formData) => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Update failed');
    }
    return await res.json();
  }
};

// === Context Setup ===
const MissionVisionContext = createContext();

export const useMissionVision = () => useContext(MissionVisionContext);

export const MissionVisionProvider = ({ children }) => {
  const [missionData, setMissionData] = useState({
    title: '',
    description: '',
    imageFile: null,
    imagePreview: null
  });

  const [visionData, setVisionData] = useState({
    title: '',
    description: '',
    imageFile: null,
    imagePreview: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getMissionVision();

        if (data) {
          setMissionData(prev => ({
            ...prev,
            title: data.missionTitle || '',
            description: data.missionDescription || '',
            imagePreview: data.missionImageUrl || null
          }));

          setVisionData(prev => ({
            ...prev,
            title: data.visionTitle || '',
            description: data.visionDescription || '',
            imagePreview: data.visionImageUrl || null
          }));
        }
      } catch (error) {
        toast.error(error.message || 'Failed to load content');
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  // Cleanup image preview URLs
  useEffect(() => {
    return () => {
      if (missionData.imageFile && missionData.imagePreview) {
        URL.revokeObjectURL(missionData.imagePreview);
      }
      if (visionData.imageFile && visionData.imagePreview) {
        URL.revokeObjectURL(visionData.imagePreview);
      }
    };
  }, [missionData.imagePreview, visionData.imagePreview]);

  const handleMissionChange = (field, value) => {
    setMissionData(prev => ({ ...prev, [field]: value }));
  };

  const handleVisionChange = (field, value) => {
    setVisionData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Updating content...');

    const formData = new FormData();
    formData.append('missionTitle', missionData.title);
    formData.append('missionDescription', missionData.description);
    if (missionData.imageFile) {
      formData.append('missionImage', missionData.imageFile);
    }

    formData.append('visionTitle', visionData.title);
    formData.append('visionDescription', visionData.description);
    if (visionData.imageFile) {
      formData.append('visionImage', visionData.imageFile);
    }

    try {
      await apiService.updateMissionVision(formData);

      toast.update(toastId, {
        render: 'Content updated successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      // Clear image previews & files
      setMissionData(prev => ({
        ...prev,
        imageFile: null,
        imagePreview: null
      }));

      setVisionData(prev => ({
        ...prev,
        imageFile: null,
        imagePreview: null
      }));

    } catch (error) {
      toast.update(toastId, {
        render: error.message || 'An error occurred during update.',
        type: 'error',
        isLoading: false,
        autoClose: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    missionData,
    visionData,
    isSubmitting,
    isFetching,
    handleMissionChange,
    handleVisionChange,
    handleSubmit,
  };

  return (
    <MissionVisionContext.Provider value={value}>
      {children}
    </MissionVisionContext.Provider>
  );
};
