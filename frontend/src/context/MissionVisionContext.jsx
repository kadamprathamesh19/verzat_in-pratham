import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const MissionVisionContext = createContext();

export const MissionVisionProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMissionVision = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/api/mission-vision`); // Update if needed
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch mission/vision:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissionVision();
  }, []);

  return (
    <MissionVisionContext.Provider value={{ data, loading, refresh: fetchMissionVision }}>
      {children}
    </MissionVisionContext.Provider>
  );
};

export const useMissionVision = () => useContext(MissionVisionContext);
