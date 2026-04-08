import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, BookOpen, Settings, Users } from 'lucide-react';
import { RoleCard } from '../components/RoleCard';

export const Home = () => {
  const navigate = useNavigate();

  const roles = [
    {
      icon: BookOpen,
      label: '01',
      sublabel: 'STUDENT',
      onClick: () => navigate('/login/student'),
      description: 'Access records, attendance, grades, and communicate with teachers.',
    },
    {
      icon: Users,
      label: '02',
      sublabel: 'TEACHER',
      onClick: () => navigate('/login/teacher'),
      description: 'Manage students, grade assignments, and schedule your classes.',
    },
    {
      icon: BarChart3,
      label: '03',
      sublabel: 'ADMIN',
      onClick: () => navigate('/login/admin'),
      description: 'Configure ERP settings, manage user roles, and oversee system operations.',
    },
    {
      icon: Settings,
      label: '04',
      sublabel: 'ADMINISTRATOR',
      onClick: () => navigate('/login/administrator'),
      description: 'Oversee institutional operations, manage resources, and generate reports.',
    },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-[#222] px-6 py-4 flex justify-between items-center">
        <div className="font-mono text-sm font-bold text-white tracking-widest">NEOERP</div>
        <div className="font-mono text-xs text-[#555] tracking-widest">
          FSAD-PS13 // Select your role to continue
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="font-syne text-5xl md:text-6xl font-bold text-white mb-4 text-center">
          Who are you?
        </h1>
        <p className="font-mono text-xs tracking-widest text-[#555] mb-12">
          SELECT YOUR ROLE TO ACCESS YOUR PORTAL
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222] w-full max-w-3xl">
          {roles.map((role, index) => (
            <div
              key={role.sublabel}
              className={`${index % 2 !== 1 ? 'md:border-r border-[#222]' : ''} ${
                index < 2 ? 'border-b border-[#222]' : ''
              }`}
            >
              <RoleCard {...role} />
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[#222] px-6 py-4 text-center">
        <div className="font-mono text-xs text-[#555] tracking-widest">FSAD-PS13 | NEOERP | 2025</div>
      </footer>
    </div>
  );
};
