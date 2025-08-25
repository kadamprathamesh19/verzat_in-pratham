import { useContext, useState, useEffect } from "react";
import { HeroContentContext } from "../context/HeroContentContext.jsx";
import { toast } from "react-toastify";

const ChangeHeroContent = () => {
  const { heroContent, updateHeroContent } = useContext(HeroContentContext);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


  useEffect(() => {
    setTitle(heroContent.title || "");
    setSubtitle(heroContent.subtitle || "");
    setVideoUrl(heroContent.videoUrl || "");
  }, [heroContent]);

  const handleVideoUpload = async (file) => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setVideoUrl(data.secure_url);
        toast.success("Video uploaded successfully!");
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Video upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subtitle) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isUploading) {
      toast.warning("Please wait for the video to finish uploading.");
      return;
    }

    try {
      await updateHeroContent({ title, subtitle, videoUrl });
      toast.success("Hero content updated successfully!");
    } catch (error) {
      toast.error("Failed to update hero content.");
    }
  };

  return (
    <div className="p-8 max-w-4xl bg-white mx-auto">
      <h2 className="text-center text-3xl text-blue-700 mb-8 font-bold">Verzat Home Page</h2>
      <form onSubmit={handleSubmit} className="p-6">
        <div>
          <label className="block mb-2 font-medium text-2xl">Home Page Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Hero Title"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-2xl">Home Page Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2 w-full mb-4"
            rows={3}
            placeholder="Hero Subtitle"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-2xl font-medium">Upload Background Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleVideoUpload(file);
            }}
          />
          {isUploading && <p className="text-blue-600 mt-2">Uploading video...</p>}
        </div>

        {videoUrl && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Preview</label>
            <video
              src={videoUrl}
              controls
              width="100%"
              className="rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className={`px-4 py-2 rounded text-white ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            }`}
        >
          {isUploading ? "Uploading..." : "Update Hero Section"}
        </button>
      </form>
    </div>
  );
};

export default ChangeHeroContent;
