import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { attendanceData } from '../../mock/attendance';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState(attendanceData);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2025);

  const stats = {
    present: attendance.filter((a) => a.status === 'PRESENT').length,
    absent: attendance.filter((a) => a.status === 'ABSENT').length,
    late: attendance.filter((a) => a.status === 'LATE').length,
  };
  const total = attendance.length;
  const percentage = Math.round(((stats.present / total) * 100 + total) / 2);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-transparent border-accent border';
      case 'ABSENT':
        return 'bg-transparent border-white border relative';
      case 'LATE':
        return 'bg-transparent border-white border relative';
      default:
        return 'bg-[#111] border border-[#222]';
    }
  };

  const getDot = (status) => {
    if (status === 'ABSENT') return 'absolute bottom-1 right-1 w-2 h-2 bg-red-500';
    if (status === 'LATE') return 'absolute bottom-1 right-1 w-2 h-2 bg-yellow-500';
    return '';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Attendance</h1>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
          <button
            onClick={() => setMonth(month === 0 ? 11 : month - 1)}
            className="text-white hover:text-accent transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="font-mono text-sm tracking-widest uppercase text-white">
            {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <button
            onClick={() => setMonth(month === 11 ? 0 : month + 1)}
            className="text-white hover:text-accent transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                className="aspect-square flex items-center justify-center font-mono text-xs text-[#555] font-bold"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {attendance.map((rec) => (
              <div
                key={rec.id}
                className={`aspect-square border ${getStatusColor(rec.status)} relative`}
              >
                <div className={getDot(rec.status)} />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-black border border-[#222] p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-mono text-xs text-[#555] tracking-widest uppercase mb-1">
                Present
              </div>
              <div className="font-syne text-2xl font-bold text-accent">{stats.present}</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[#555] tracking-widest uppercase mb-1">
                Absent
              </div>
              <div className="font-syne text-2xl font-bold text-white">{stats.absent}</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[#555] tracking-widest uppercase mb-1">
                Late
              </div>
              <div className="font-syne text-2xl font-bold text-white">{stats.late}</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs text-[#555] tracking-widest uppercase mb-1">
                Percentage
              </div>
              <div className="font-syne text-2xl font-bold text-accent">{percentage}%</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
