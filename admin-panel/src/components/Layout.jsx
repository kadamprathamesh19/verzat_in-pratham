import React from 'react';
import Sidebar from './Sidebar'; // Adjust path if needed
import Topbar from './Topbar';   // Adjust path if needed
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        <Topbar />
        <main className="p-6 flex-grow">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}
