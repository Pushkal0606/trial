import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { usersData } from '../../mock/users';

export const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student', status: 'Active' });

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (formData.name && formData.email && formData.role) {
      setUsers([{ id: Date.now(), ...formData }, ...users]);
      setFormData({ name: '', email: '', role: 'student', status: 'Active' });
      setModalOpen(false);
    }
  };

  const handleDeactivate = (userId) => {
    setUsers(users.map((u) =>
      u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-white">User Management</h1>
          <button
            onClick={() => {
              setIsCreating(true);
              setFormData({ name: '', email: '', role: 'student', status: 'Active' });
              setModalOpen(true);
            }}
            className="bg-black border border-white text-white font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all"
          >
            Add User
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-black border border-[#555] px-4 py-2 text-white focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Name', 'Email', 'Role', 'Status', 'Actions'].map((h) => (
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
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-white text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-accent font-mono text-xs uppercase">{user.role}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs px-2 py-1 border ${
                      user.status === 'Active'
                        ? 'border-accent text-accent'
                        : 'border-[#555] text-[#555]'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setFormData(user);
                        setIsCreating(false);
                        setModalOpen(true);
                      }}
                      className="text-accent hover:text-white font-mono text-xs transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="text-[#555] hover:text-red-400 font-mono text-xs transition-colors"
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isCreating ? 'Add User' : 'Edit User'}
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
              Name
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
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
            >
              {['student', 'teacher', 'admin', 'administrator'].map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
