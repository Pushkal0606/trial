import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { studentsData } from '../../mock/students';

export const TeacherGrades = () => {
  const [selectedClass, setSelectedClass] = useState('101');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [grades, setGrades] = useState({});

  const filteredStudents = studentsData.filter((s) => s.classId === selectedClass);

  const handleGradeChange = (studentId, value) => {
    setGrades((prev) => ({ ...prev, [studentId]: value }));
  };

  const getPercentageColor = (grade) => {
    if (!grade) return '';
    const num = parseInt(grade);
    if (num >= 80) return 'text-accent';
    if (num >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Grades</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            >
              {['101', '102', '103'].map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            >
              {['Data Structures', 'Web Development', 'Database Design'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Student Name', 'Assignment 1', 'Assignment 2', 'Assignment 3', 'Final Grade'].map((h) => (
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
                  {[1, 2, 3].map((num) => (
                    <td key={num} className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        onChange={(e) =>
                          handleGradeChange(`${student.id}-${num}`, e.target.value)
                        }
                        className="w-20 bg-[#0a0a0a] border border-[#555] px-2 py-1 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                        placeholder="0-100"
                      />
                    </td>
                  ))}
                  <td className={`px-4 py-3 font-mono text-sm ${getPercentageColor(grades[student.id])}`}>
                    {grades[student.id] || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button className="bg-black border border-white text-white font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all">
            Save Grades
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
