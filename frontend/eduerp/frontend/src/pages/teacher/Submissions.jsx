import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { studentsData } from '../../mock/students';
import { assignmentsData } from '../../mock/assignments';

export const Submissions = () => {
  const [selectedAssignment, setSelectedAssignment] = useState(assignmentsData[0]);
  const [grades, setGrades] = useState({});

  const submissions = [
    { studentId: 1, name: 'Aarav Kumar', submittedAt: new Date(2025, 1, 21) },
    { studentId: 2, name: 'Bhavna Singh', submittedAt: new Date(2025, 1, 20) },
    { studentId: 3, name: 'Yuki Tanaka', submittedAt: new Date(2025, 1, 21) },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Submissions</h1>

        <div className="mb-6">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Select Assignment
          </label>
          <select
            value={selectedAssignment.id}
            onChange={(e) =>
              setSelectedAssignment(
                assignmentsData.find((a) => a.id === parseInt(e.target.value))
              )
            }
            className="w-full md:w-1/3 bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
          >
            {assignmentsData.map((asg) => (
              <option key={asg.id} value={asg.id}>
                {asg.title}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Student', 'Submitted At', 'File', 'Grade', 'Feedback'].map((h) => (
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
              {submissions.map((sub) => (
                <tr
                  key={sub.studentId}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{sub.name}</td>
                  <td className="px-4 py-3 text-white text-sm">
                    {sub.submittedAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-accent text-xs hover:underline">
                    submission.pdf
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      defaultValue={grades[sub.studentId] || ''}
                      onChange={(e) =>
                        setGrades({
                          ...grades,
                          [sub.studentId]: e.target.value,
                        })
                      }
                      className="w-16 bg-[#0a0a0a] border border-[#555] px-2 py-1 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="0-100"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="w-full bg-[#0a0a0a] border border-[#555] px-2 py-1 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                      placeholder="Add feedback..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button className="bg-black border border-white text-white font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all">
            Save All Grades
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
