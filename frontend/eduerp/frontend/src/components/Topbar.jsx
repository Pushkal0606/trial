import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut } from 'lucide-react';
import { NotificationBell } from './NotificationBell';

export const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const getBreadcrumb = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'Home';

    return segments
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' / ');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-black border-b border-[#222] px-4 md:px-6 py-4 flex items-center justify-between fixed top-0 right-0 left-0 z-20 md:left-56">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-white hover:text-accent transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="font-mono text-xs tracking-widest uppercase text-[#555]">
          {getBreadcrumb()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <NotificationBell />
        <div className="text-white font-mono text-xs">{user?.name || 'User'}</div>
        <div className="w-8 h-8 bg-navy border border-accent flex items-center justify-center font-mono text-xs font-bold text-accent">
          {user?.name?.split(' ').map((n) => n[0]).join('') || 'U'}
        </div>
        <button
          onClick={handleLogout}
          className="text-white hover:text-accent transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};
