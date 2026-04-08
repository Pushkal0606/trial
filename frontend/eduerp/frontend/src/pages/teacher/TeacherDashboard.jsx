import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { scheduleData, getTodaySchedule } from '../../mock/schedule';
import { Users, Calendar, BookOpen, Zap } from 'lucide-react';

export const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    todayClasses: 0,
    pendingSubmissions: 0,
    studentsTaught: 0,
    announcementsPosted: 0,
  });
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    setStats({
      todayClasses: getTodaySchedule().length,
      pendingSubmissions: 12,
      studentsTaught: 75,
      announcementsPosted: 8,
    });
    setTodaySchedule(getTodaySchedule());
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, label: "Today's Classes", value: stats.todayClasses },
            { icon: Zap, label: 'Pending Submissions', value: stats.pendingSubmissions },
            { icon: Users, label: 'Students Taught', value: stats.studentsTaught },
            { icon: BookOpen, label: 'Announcements', value: stats.announcementsPosted },
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

        {/* Today's Schedule */}
        <div className="mb-8">
          <h2 className="font-syne text-xl font-bold text-white mb-4">Today's Schedule</h2>
          <div className="space-y-2">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((period, idx) => (
                <div key={idx} className="bg-black border border-[#222] p-3 hover:bg-navy transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-syne font-bold text-white">{period.subject}</h3>
                      <div className="font-mono text-xs text-[#555] mt-1">{period.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-accent font-mono text-xs">{period.room}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-black border border-[#222] p-4 text-center text-[#555]">
                No classes today
              </div>
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div>
          <h2 className="font-syne text-xl font-bold text-white mb-4">Recent Submissions</h2>
          <div className="space-y-2">
            {[
              { student: 'Aarav Kumar', assignment: 'Array Operations', submitted: '2h ago' },
              { student: 'Bhavna Singh', assignment: 'Data Structures Project', submitted: '4h ago' },
              { student: 'Yuki Tanaka', assignment: 'Web Design', submitted: '6h ago' },
            ].map((sub, idx) => (
              <div key={idx} className="bg-black border border-[#222] p-3 hover:bg-navy transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-syne font-bold text-white">{sub.assignment}</h3>
                    <div className="font-mono text-xs text-[#555] mt-1">From: {sub.student}</div>
                  </div>
                  <div className="text-accent font-mono text-xs">{sub.submitted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
