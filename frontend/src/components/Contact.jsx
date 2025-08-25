import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const extractSrcFromIframe = (iframeString) => {
  if (!iframeString) return null;
  const match = iframeString.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

const decodeHtmlEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/contact`);
        if (!res.ok) throw new Error("Failed to load contact info");
        const data = await res.json();
        setContact(data);
      } catch (error) {
        console.error("Failed to load contact info:", error);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message submitted successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Decode HTML entities in the extracted src URL
  const mapSrc = useMemo(() => {
    if (!contact?.mapEmbedUrl) return null;

    let src = null;
    if (contact.mapEmbedUrl.trim().startsWith("<iframe")) {
      src = extractSrcFromIframe(contact.mapEmbedUrl);
    } else {
      src = contact.mapEmbedUrl;
    }

    if (src) {
      src = decodeHtmlEntities(src);
    }

    return src;
  }, [contact?.mapEmbedUrl]);

  // Split pageTitle for styled rendering
  const renderStyledTitle = () => {
    if (!contact?.pageTitle) return null;

    const words = contact.pageTitle.trim().split(" ");
    const firstTwo = words.slice(0, 2).join(" ");
    const rest = words.slice(2).join(" ");

    return (
      <h2 className="text-4xl md:text-5xl font-bold">
        <span className="text-white">{firstTwo}</span>{" "}
        <span className="text-blue-600">{rest}</span>
      </h2>
    );
  };

  return (
    <motion.section
      id="contact"
      className="min-h-screen bg-[#0f172a] py-24 px-6 md:px-16 text-white"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        <motion.div className="text-center" variants={fadeInUp}>
          {renderStyledTitle()}
        </motion.div>

        {/* /////////////////////////////////// CONTENT GRID //////////////////////////////////////////////////////// */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          <motion.div
            className="flex flex-col max-w-md w-full mx-auto lg:mx-0"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg text-base font-medium text-gray-100 mb-10 space-y-2">
              <p>{contact?.address || "Loading address..."}</p>
              <br />
              <p>{contact?.email || "Loading email..."}</p>
              {/* <p>{contact?.phone || "Loading phone..."}</p> */}
            </div>

            <div className="h-[60%] rounded-xl overflow-hidden shadow-md w-full">
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Company Location"
                />
              ) : (
                <div className="text-white">Loading map...</div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="relative bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-3xl mx-auto overflow-hidden"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/Logo.png"
              alt="Background Logo"
              className="absolute inset-0 w-full h-full object-contain sm:object-cover opacity-10 sm:opacity-20 pointer-events-none z-0"
            />
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-6 sm:mb-8 text-center sm:text-center">
                Send Us a Message
              </h3>

              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block mb-1 font-semibold text-gray-800">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-800">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none resize-none text-gray-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactForm;
