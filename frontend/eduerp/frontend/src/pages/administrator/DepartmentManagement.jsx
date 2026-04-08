import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';

export const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Computer Science', hod: 'Dr. Rajesh Kumar', students: 25, teachers: 5 },
    { id: 2, name: 'Electronics', hod: 'Dr. Vikram Singh', students: 18, teachers: 4 },
    { id: 3, name: 'Mechanical', hod: 'Prof. Ashok Patel', students: 22, teachers: 4 },
    { id: 4, name: 'Civil', hod: 'Dr. Sarah Johnson', students: 12, teachers: 3 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', hod: '', students: '', teachers: '' });

  const handleCreate = () => {
    if (formData.name && formData.hod && formData.students && formData.teachers) {
      setDepartments([
        {
          id: Date.now(),
          name: formData.name,
          hod: formData.hod,
          students: parseInt(formData.students),
          teachers: parseInt(formData.teachers),
        },
        ...departments,
      ]);
      setFormData({ name: '', hod: '', students: '', teachers: '' });
      setModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-white">Department Management</h1>
          <button
            onClick={() => {
              setIsCreating(true);
              setFormData({ name: '', hod: '', students: '', teachers: '' });
              setModalOpen(true);
            }}
            className="bg-black border border-white text-white font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all"
          >
            Add Department
          </button>
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Department Name', 'HOD', 'Students', 'Teachers'].map((h) => (
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
              {departments.map((dept) => (
                <tr
                  key={dept.id}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{dept.name}</td>
                  <td className="px-4 py-3 text-white text-sm">{dept.hod}</td>
                  <td className="px-4 py-3 text-white text-sm">{dept.students}</td>
                  <td className="px-4 py-3 text-white text-sm">{dept.teachers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isCreating ? 'Add Department' : 'Edit Department'}
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
              {isCreating ? 'Add' : 'Update'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Department Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              HOD Name
            </label>
            <input
              type="text"
              value={formData.hod}
              onChange={(e) => setFormData({ ...formData, hod: e.target.value })}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
                Students
              </label>
              <input
                type="number"
                value={formData.students}
                onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
                Teachers
              </label>
              <input
                type="number"
                value={formData.teachers}
                onChange={(e) => setFormData({ ...formData, teachers: e.target.value })}
                className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
