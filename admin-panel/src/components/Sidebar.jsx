import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger icon only on mobile when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-md focus:outline-none md:hidden"
          aria-label="Open sidebar"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar container */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block md:relative fixed z-50 w-64 h-[150vh] bg-gray-800 text-white p-4`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold md:block hidden">Menu Panel</h2>
          <button
            className="md:hidden text-white"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            {/* X icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/users', label: 'Users' },
            { to: '/messages', label: 'Users Messages' },
            { to: '/newsletter', label: 'Newsletter Subscribers' },
            { to: '/Change-Hero-Content', label: 'Change Hero Content ' },
            { to: '/change-service-content', label: 'Change Service Content ' },
            { to: '/change-about-content', label: 'Change About Content ' },
            { to: '/change-mission-vision-content', label: 'Change Mission & vision' },
            { to: '/change-base-content', label: 'Change Base Content' },
            { to: '/change-latest-product', label: 'Change R&D Product' },
            { to: '/change-contact-content', label: 'Change Contact Content' },
            { to: '#', label: 'Settings' },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="block bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded border border-gray-600"
                onClick={() => setIsOpen(false)} // close sidebar on link click (mobile)
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
