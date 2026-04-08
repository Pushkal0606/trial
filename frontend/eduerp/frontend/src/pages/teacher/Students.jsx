import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { studentsData } from '../../mock/students';

export const TeacherStudents = () => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = studentsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Students</h1>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full bg-black border border-[#555] px-4 py-2 text-white focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Name', 'Enrollment ID', 'Department', 'Class', 'Email', 'Action'].map((h) => (
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
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{student.name}</td>
                  <td className="px-4 py-3 text-white text-sm font-mono">{student.enrollmentId}</td>
                  <td className="px-4 py-3 text-white text-sm">{student.department}</td>
                  <td className="px-4 py-3 text-white text-sm">{student.classId}</td>
                  <td className="px-4 py-3 text-[#555] text-sm">{student.email}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setModalOpen(true);
                      }}
                      className="text-accent hover:text-white font-mono text-xs transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedStudent.name}
          footerActions={
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-[#222] text-white hover:border-accent transition-colors"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-navy border-2 border-accent flex items-center justify-center font-mono text-xl font-bold text-accent">
                {selectedStudent.avatar}
              </div>
              <div>
                <h3 className="font-syne font-bold text-white text-lg">
                  {selectedStudent.name}
                </h3>
                <p className="text-accent font-mono text-xs">{selectedStudent.enrollmentId}</p>
              </div>
            </div>

            {[
              { label: 'Email', value: selectedStudent.email },
              { label: 'Department', value: selectedStudent.department },
              { label: 'Class', value: selectedStudent.classId },
              { label: 'Enrollment ID', value: selectedStudent.enrollmentId },
            ].map((field) => (
              <div key={field.label}>
                <p className="font-mono text-xs text-[#555] tracking-widest uppercase mb-1">
                  {field.label}
                </p>
                <p className="text-white">{field.value}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};
