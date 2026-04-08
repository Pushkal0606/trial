import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { assignmentsData } from '../../mock/assignments';

export const CreateAssignment = () => {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    classId: '',
    dueDate: '',
    description: '',
  });

  const handleCreate = () => {
    if (formData.title && formData.subject && formData.dueDate) {
      const newAssignment = {
        id: Date.now(),
        ...formData,
        teacherId: 1,
        dueDate: new Date(formData.dueDate),
      };
      setAssignments([newAssignment, ...assignments]);
      setFormData({
        title: '',
        subject: '',
        classId: '',
        dueDate: '',
        description: '',
      });
      setModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-white">Assignments</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black border border-white text-white font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all"
          >
            Create Assignment
          </button>
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Subject', 'Title', 'Class', 'Due Date', 'Submissions'].map((h) => (
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
              {assignments.map((asg) => (
                <tr
                  key={asg.id}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{asg.subject}</td>
                  <td className="px-4 py-3 text-white text-sm">{asg.title}</td>
                  <td className="px-4 py-3 text-white text-sm">{asg.classId}</td>
                  <td className="px-4 py-3 text-accent text-sm">
                    {new Date(asg.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-accent font-mono text-xs">4</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Assignment"
        footerActions={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-[#222] text-white hover:border-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-accent text-black hover:bg-white transition-colors font-mono text-sm"
            >
              Create
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
              placeholder="Assignment title..."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
                placeholder="Subject..."
              />
            </div>
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
                Class
              </label>
              <input
                type="text"
                value={formData.classId}
                onChange={(e) =>
                  setFormData({ ...formData, classId: e.target.value })
                }
                className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
                placeholder="Class ID..."
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
              rows="3"
              placeholder="Assignment description..."
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
