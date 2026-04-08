import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { studentsData } from '../../mock/students';
import { teachersData } from '../../mock/teachers';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';

export const AdministratorDashboard = () => {
  const [stats, setStats] = useState({
    totalEnrollment: 0,
    totalStaff: 0,
    attendanceRate: 0,
    pendingReports: 0,
  });

  useEffect(() => {
    setStats({
      totalEnrollment: studentsData.length,
      totalStaff: teachersData.length,
      attendanceRate: 87,
      pendingReports: 5,
    });
  }, []);

  const departments = [
    { name: 'Computer Science', students: 25, percentage: 45 },
    { name: 'Electronics', students: 18, percentage: 32 },
    { name: 'Mechanical', students: 22, percentage: 40 },
    { name: 'Civil', students: 12, percentage: 22 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Total Enrollment', value: stats.totalEnrollment },
            { icon: Users, label: 'Total Staff', value: stats.totalStaff },
            { icon: TrendingUp, label: 'Attendance Rate', value: `${stats.attendanceRate}%` },
            { icon: BarChart3, label: 'Pending Reports', value: stats.pendingReports },
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

        {/* Department Breakdown */}
        <div>
          <h2 className="font-syne text-xl font-bold text-white mb-4">Department Overview</h2>
          <div className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-black border border-[#222] p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-syne font-bold text-white">{dept.name}</h3>
                  <span className="text-accent font-mono text-sm">{dept.students} students</span>
                </div>
                <div className="w-full bg-[#0a0a0a] border border-[#222] h-2">
                  <div
                    className="bg-accent h-full"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
