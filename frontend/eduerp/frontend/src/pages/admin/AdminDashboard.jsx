import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { usersData } from '../../mock/users';
import { auditLogsData } from '../../mock/auditLogs';
import { Users, AlertCircle, Activity } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    activeTeachers: 0,
    systemAlerts: 0,
  });

  useEffect(() => {
    setStats({
      totalUsers: usersData.length,
      activeStudents: usersData.filter((u) => u.role === 'student' && u.status === 'Active').length,
      activeTeachers: usersData.filter((u) => u.role === 'teacher' && u.status === 'Active').length,
      systemAlerts: 3,
    });
  }, []);

  const recentLogs = auditLogsData.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Total Users', value: stats.totalUsers },
            { icon: Users, label: 'Active Students', value: stats.activeStudents },
            { icon: Users, label: 'Active Teachers', value: stats.activeTeachers },
            { icon: AlertCircle, label: 'System Alerts', value: stats.systemAlerts },
          ].map((stat, idx) => (
            <div key={idx} className="bg-black border border-[#222] p-4 hover:border-t-4 hover:border-t-accent transition-all">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon size={20} className="text-[#555]" />
                <span className="font-mono text-xs tracking-widest uppercase text-[#555]">
                  {stat.label}
                </span>
              </div>
              <div className="font-syne text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Audit Logs */}
        <div>
          <h2 className="font-syne text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="overflow-x-auto border border-[#222]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#222] bg-[#0a0a0a]">
                  {['Timestamp', 'User', 'Role', 'Action', 'Entity'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                  >
                    <td className="px-4 py-3 text-white text-sm font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">{log.user}</td>
                    <td className="px-4 py-3 text-accent text-sm font-mono text-xs">
                      {log.role.toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">{log.action}</td>
                    <td className="px-4 py-3 text-white text-sm">{log.entity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
