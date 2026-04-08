import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { studentsData } from '../../mock/students';

export const MarkAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('101');
  const [attendance, setAttendance] = useState(
    studentsData.reduce((acc, s) => {
      acc[s.id] = 'PRESENT';
      return acc;
    }, {})
  );

  const filteredStudents = studentsData.filter((s) => s.classId === selectedClass);

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Mark Attendance</h1>

        <div className="mb-6">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Select Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full md:w-1/3 bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
          >
            {['101', '102', '103'].map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Student Name', 'Present', 'Absent', 'Late'].map((h) => (
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
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{student.name}</td>
                  {['PRESENT', 'ABSENT', 'LATE'].map((status) => (
                    <td key={status} className="px-4 py-3 text-center">
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        value={status}
                        checked={attendance[student.id] === status}
                        onChange={(e) => handleAttendance(student.id, e.target.value)}
                        className="cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button className="bg-black border border-white text-white font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all">
            Submit Attendance
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
