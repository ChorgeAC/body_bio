// src/layouts/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <Header />

      {/* CONTENT AREA (Sidebar + Main) */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 bg-gray-100 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <footer className="h-14 bg-white shadow-sm flex items-center justify-center text-xs text-gray-500">
        © 2025 Body Bio · All rights reserved
      </footer>
    </div>
  );
};

export default AppLayout;
