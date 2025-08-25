import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatModal from "./ChatBotModal";

const AIChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatModal = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* ChatBot Button - Bottom Right */}
      <div className="fixed bottom-4 right-[15%] sm:bottom-4 sm:right-[9%] z-50 group">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChatModal}
          className="
            w-11 h-11 sm:w-12 sm:h-12
            flex items-center justify-center
            rounded-full
            bg-gradient-to-br from-purple-700 to-black
            text-white
            shadow-xl
            border-2 border-purple-500
            transition-transform duration-200 ease-in-out
          "
          style={{
            boxShadow: "0 0 24px rgba(139, 92, 246, 0.4)", // subtle purple glow
          }}
          aria-label="Open Chatbot"
        >
          {/* ✅ Animated Chat SVG */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-6 sm:w-7 sm:h-7"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12.5C21 8.91 17.64 6 13.5 6C9.36 6 6 8.91 6 12.5C6 13.89 6.54 15.17 7.44 16.2L6.38 19.38C6.25 19.75 6.63 20.07 6.98 19.9L10.44 18.22C11.33 18.56 12.39 18.75 13.5 18.75C17.64 18.75 21 15.84 21 12.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="12" r="1" fill="currentColor">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle cx="13" cy="12" r="1" fill="currentColor">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              <circle cx="16" cy="12" r="1" fill="currentColor">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
              </circle>
            </svg>
          </motion.div>
        </motion.button>

        {/* Tooltip (hidden on mobile) */}
        <div
          className="
            hidden sm:block
            absolute right-14 top-1/2 -translate-y-1/2
            bg-black bg-opacity-80 text-white text-xs
            px-2 py-1 rounded shadow-lg
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300 whitespace-nowrap
          "
        >
          Verzat Chatbot
        </div>
      </div>

      {/* Chat Modal */}
      {isOpen && <ChatModal onClose={toggleChatModal} />}
    </>
  );
};

export default AIChatButton;
