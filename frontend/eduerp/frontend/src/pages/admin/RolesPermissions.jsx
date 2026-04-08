import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';

export const RolesPermissions = () => {
  const roles = ['Student', 'Teacher', 'Admin', 'Administrator'];
  const modules = ['Announcements', 'Assignments', 'Grades', 'Attendance', 'Messages', 'Reports', 'Finance', 'Settings'];
  const [permissions, setPermissions] = useState({
    Student: ['Announcements', 'Assignments', 'Grades', 'Attendance', 'Messages'],
    Teacher: ['Announcements', 'Assignments', 'Grades', 'Attendance', 'Messages'],
    Admin: ['Announcements', 'Grades', 'Attendance', 'Reports', 'Settings'],
    Administrator: ['Announcements', 'Assignments', 'Grades', 'Attendance', 'Reports', 'Finance', 'Settings'],
  });

  const togglePermission = (role, module) => {
    setPermissions((prev) => {
      const rolePerms = prev[role];
      return {
        ...prev,
        [role]: rolePerms.includes(module)
          ? rolePerms.filter((m) => m !== module)
          : [...rolePerms, module],
      };
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Roles & Permissions</h1>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                <th className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white">
                  Role
                </th>
                {modules.map((module) => (
                  <th
                    key={module}
                    className="px-4 py-3 text-center font-mono text-xs tracking-widest uppercase text-white"
                  >
                    {module}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white font-mono text-sm">{role}</td>
                  {modules.map((module) => (
                    <td
                      key={`${role}-${module}`}
                      className="px-4 py-3 text-center"
                    >
                      <button
                        onClick={() => togglePermission(role, module)}
                        className={`w-6 h-6 border transition-colors ${
                          permissions[role].includes(module)
                            ? 'bg-accent border-accent'
                            : 'border-[#555]'
                        }`}
                      >
                        {permissions[role].includes(module) ? '✓' : ''}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button className="bg-black border border-white text-white font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all">
            Save Permissions
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
