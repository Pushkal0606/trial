import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-20 p-4 md:p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
