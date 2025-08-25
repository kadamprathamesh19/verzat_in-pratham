import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import modalBg from "../assets/Hero/Logo.png"; // ✅ Your logo path

const LoginModal = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const modalRef = useRef(null);

  // ✅ Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Toggle Signup/Login
  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  // ✅ Close on outside click
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // ✅ Close on ESC
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ✅ Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "/api/users/register"
      : "/api/users/login";

    const payload = isSignup
      ? { name: formData.name, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      toast.success(isSignup ? "Registered successfully!" : "Logged in successfully!");

      // Optionally store the token
      localStorage.setItem("token", data.token);

      // Close modal
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative rounded-lg p-6 w-[90%] max-w-md shadow-xl bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${modalBg})` }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/85 z-0 rounded-lg backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 text-gray-900">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-700 hover:text-black text-2xl font-bold z-20"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">
            {isSignup ? "Sign Up" : "Login"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-2 rounded-md font-semibold shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <p className="text-center text-sm text-gray-700">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={handleToggle}
                className="text-blue-700 underline ml-1"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
