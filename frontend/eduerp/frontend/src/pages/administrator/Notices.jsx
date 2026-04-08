import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';

export const Notices = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Academic Calendar Released', body: 'The academic calendar for next semester is now available.', postedAt: new Date() },
    { id: 2, title: 'Infrastructure Update', body: 'New labs and classrooms are now operational.', postedAt: new Date() },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '' });

  const handlePublish = () => {
    if (formData.title && formData.body) {
      setNotices([
        { id: Date.now(), title: formData.title, body: formData.body, postedAt: new Date() },
        ...notices,
      ]);
      setFormData({ title: '', body: '' });
      setModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-white">Notices</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-black border border-white text-white font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all"
          >
            Publish Notice
          </button>
        </div>

        <div className="space-y-3">
          {notices.map((notice) => (
            <div key={notice.id} className="bg-black border border-[#222] p-4 hover:bg-navy transition-colors">
              <h3 className="font-syne font-bold text-white">{notice.title}</h3>
              <p className="text-white text-sm mt-2">{notice.body}</p>
              <div className="font-mono text-xs text-[#555] mt-2">
                Posted {new Date(notice.postedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black border border-[#222] w-full max-w-md">
            <div className="border-b border-[#222] px-6 py-4 flex justify-between items-center">
              <h2 className="font-syne font-bold text-white text-lg">Publish Notice</h2>
              <button onClick={() => setModalOpen(false)} className="text-[#555] hover:text-accent transition-colors">
                ✕
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
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
            <div className="border-t border-[#222] px-6 py-4 flex gap-2 justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-[#222] text-white hover:border-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-accent text-black hover:bg-white transition-colors font-mono text-sm"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
