import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LogOut, LayoutDashboard, Bell, Files, BarChart3, Users, Calendar, MessageSquare,
  User, Settings, Lock, Zap, DollarSign, BookOpen, Menu, X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/${role}/dashboard` },
    ];

    const roleItems = {
      student: [
        { icon: Bell, label: 'Announcements', path: '/student/announcements' },
        { icon: BookOpen, label: 'Assignments', path: '/student/assignments' },
        { icon: BarChart3, label: 'Grades', path: '/student/grades' },
        { icon: Calendar, label: 'Attendance', path: '/student/attendance' },
        { icon: Calendar, label: 'Schedule', path: '/student/schedule' },
        { icon: MessageSquare, label: 'Messages', path: '/student/messages' },
        { icon: User, label: 'Profile', path: '/student/profile' },
      ],
      teacher: [
        { icon: Bell, label: 'Announcements', path: '/teacher/announcements' },
        { icon: Files, label: 'Assignments', path: '/teacher/create-assignment' },
        { icon: Zap, label: 'Submissions', path: '/teacher/submissions' },
        { icon: Calendar, label: 'Attendance', path: '/teacher/mark-attendance' },
        { icon: BarChart3, label: 'Grades', path: '/teacher/grades' },
        { icon: Users, label: 'Students', path: '/teacher/students' },
        { icon: MessageSquare, label: 'Messages', path: '/teacher/messages' },
        { icon: User, label: 'Profile', path: '/teacher/profile' },
      ],
      admin: [
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Lock, label: 'Roles & Permissions', path: '/admin/roles-permissions' },
        { icon: Bell, label: 'Announcements', path: '/admin/announcements' },
        { icon: Files, label: 'Audit Logs', path: '/admin/audit-logs' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
        { icon: User, label: 'Profile', path: '/admin/profile' },
      ],
      administrator: [
        { icon: BarChart3, label: 'Overview', path: '/administrator/overview' },
        { icon: Zap, label: 'Resources', path: '/administrator/resources' },
        { icon: Files, label: 'Reports', path: '/administrator/reports' },
        { icon: Users, label: 'Departments', path: '/administrator/departments' },
        { icon: DollarSign, label: 'Finance', path: '/administrator/finance' },
        { icon: Bell, label: 'Notices', path: '/administrator/notices' },
        { icon: User, label: 'Profile', path: '/administrator/profile' },
      ],
    };

    return [...baseItems, ...(roleItems[role] || [])];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onClose} />}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-56 bg-black border-r border-[#222] z-40 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative flex flex-col overflow-y-auto`}
      >
        <div className="p-6 border-b border-[#222] flex items-center justify-between md:justify-start">
          <div className="font-mono text-sm font-bold text-white tracking-widest">neoerp</div>
          <button onClick={onClose} className="md:hidden text-[#555] hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 transition-all border-l-4 ${
                isActive(item.path)
                  ? 'border-l-accent text-accent bg-[#0a0a0a]'
                  : 'border-l-transparent text-white hover:text-accent hover:border-l-accent'
              }`}
            >
              <item.icon size={18} />
              <span className="font-mono text-xs tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[#222] p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-white hover:text-accent transition-colors border border-transparent hover:border-accent"
          >
            <LogOut size={18} />
            <span className="font-mono text-xs tracking-widest uppercase">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
