import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';

export const SystemAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Maintenance', body: 'Scheduled maintenance on Sunday', postedAt: new Date() },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '' });

  const handleBroadcast = () => {
    if (formData.title && formData.body) {
      setAnnouncements([
        { id: Date.now(), title: formData.title, body: formData.body, postedAt: new Date() },
        ...announcements,
      ]);
      setFormData({ title: '', body: '' });
      setModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-white">System Announcements</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black border border-white text-white font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all"
          >
            Broadcast
          </button>
        </div>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div key={ann.id} className="bg-black border border-[#222] p-4 hover:bg-navy transition-colors">
              <h3 className="font-syne font-bold text-white">{ann.title}</h3>
              <p className="text-white text-sm mt-2">{ann.body}</p>
              <div className="font-mono text-xs text-[#555] mt-2">
                Posted {new Date(ann.postedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Broadcast to All Users"
        footerActions={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-[#222] text-white hover:border-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBroadcast}
              className="px-4 py-2 bg-accent text-black hover:bg-white transition-colors font-mono text-sm"
            >
              Broadcast
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
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
              Message
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full bg-black border border-[#555] px-3 py-2 text-white focus:border-accent focus:outline-none transition-colors"
              rows="5"
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
