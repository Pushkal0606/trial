import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { scheduleData } from '../../mock/schedule';

export const StudentSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Schedule</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#222]">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                <th className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className={`px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white border-l border-[#222] ${
                      new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day
                        ? 'border-t-4 border-t-accent'
                        : ''
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                '09:00-10:00',
                '10:15-11:15',
                '11:30-12:30',
                '01:30-02:30',
                '02:30-03:30',
              ].map((time) => (
                <tr key={time} className="border-b border-[#222]">
                  <td className="px-4 py-3 font-mono text-xs text-white border-r border-[#222]">
                    {time}
                  </td>
                  {days.map((day) => {
                    const dayKey = day.toLowerCase();
                    const schedule =
                      scheduleData[dayKey]?.find((s) =>
                        s.time.startsWith(time.split('-')[0])
                      ) || {};

                    return (
                      <td
                        key={`${day}-${time}`}
                        className="px-4 py-3 text-white text-sm border-l border-[#222] hover:bg-navy transition-colors"
                      >
                        {schedule.subject && (
                          <>
                            <div className="font-syne font-bold">{schedule.subject}</div>
                            <div className="text-xs text-[#555]">
                              {schedule.teacher}
                            </div>
                            <div className="text-xs text-accent">{schedule.room}</div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};
