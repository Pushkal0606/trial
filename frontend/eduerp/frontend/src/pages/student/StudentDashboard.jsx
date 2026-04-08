import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { client } from '../../api/client';
import { announcementsData } from '../../mock/announcements';
import { assignmentsData } from '../../mock/assignments';
import { attendanceData } from '../../mock/attendance';
import { Calendar, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  
  const [stats, setStats] = useState({
    todayClasses: 0,
    pendingAssignments: 0,
    attendancePercentage: 0,
    gpa: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await client.get(`/dashboard/student/${user?.id}`);
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Failed to load real-time analytics.');
      }
    };
    
    if (user?.id) {
      fetchStats();
    }
  }, [user?.id]);

  const recentAnnouncements = announcementsData.slice(0, 3);
  const upcomingAssignments = assignmentsData.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Dashboard</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, label: "Today's Classes", value: stats.todayClasses },
            { icon: BookOpen, label: 'Pending Assignments', value: stats.pendingAssignments },
            { icon: CheckCircle, label: 'Attendance %', value: `${stats.attendancePercentage}%` },
            { icon: TrendingUp, label: 'Current GPA', value: stats.gpa.toFixed(2) },
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

        {/* Recent Announcements */}
        <div className="mb-8">
          <h2 className="font-syne text-xl font-bold text-white mb-4">Recent Announcements</h2>
          <div className="space-y-2">
            {recentAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-black border border-[#222] p-4 hover:bg-navy transition-colors">
                <h3 className="font-syne font-bold text-white">{ann.title}</h3>
                <p className="text-white text-sm mt-1 line-clamp-2">{ann.body}</p>
                <div className="font-mono text-xs text-[#555] mt-2">
                  Posted by {ann.postedBy} · {new Date(ann.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div>
          <h2 className="font-syne text-xl font-bold text-white mb-4">Upcoming Assignments</h2>
          <div className="space-y-2">
            {upcomingAssignments.map((asg) => (
              <div key={asg.id} className="bg-black border border-[#222] p-4 hover:bg-navy transition-colors">
                <h3 className="font-syne font-bold text-white">{asg.title}</h3>
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-xs text-[#555]">{asg.subject}</span>
                  <span className="font-mono text-xs text-accent">
                    Due: {new Date(asg.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
