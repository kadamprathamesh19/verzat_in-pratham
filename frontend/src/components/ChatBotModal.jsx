// src/components/ChatModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { IoClose, IoSend } from "react-icons/io5";

const ChatModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-20 right-48 z-50 w-80 h-96 bg-white rounded-xl shadow-2xl border border-blue-200 flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-t-xl">
        <h3 className="text-lg font-semibold">Verzat AI Assistant</h3>
        <button onClick={onClose} className="text-xl hover:text-red-400">
          <IoClose />
        </button>
      </div>

      {/* Chat content */}
      <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-800">
        {/* Replace with dynamic messages */}
        <p>Hi! 👋 How can I help you today?</p>
      </div>

      {/* Input area with send button */}
      <div className="p-3 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            aria-label="Send"
          >
            <IoSend className="text-lg" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatModal;
