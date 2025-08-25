
// fetchAboutDescription.js
export const fetchAboutDescription = async () => {
  const res = await fetch("http://localhost:5000/api/about/description");
  if (!res.ok) throw new Error("Failed to fetch description");
  const data = await res.json();

  // Assume API returns: { title: "Verzat R&D", description: "..." }
  return {
    title: data.title || "",
    description: data.description || "",
    videoUrl: data.videoUrl || "",
  };
};


// fetchAboutValues.js
export const fetchAboutValues = async () => {
  const res = await fetch("http://localhost:5000/api/about/values");
  if (!res.ok) throw new Error('Failed to fetch values');
  const data = await res.json();

  // Assume API returns an array of values
  return data || [];
};

