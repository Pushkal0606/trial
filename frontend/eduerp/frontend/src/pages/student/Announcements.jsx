import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { announcementsData } from '../../mock/announcements';

export const StudentAnnouncements = () => {
  const [filter, setFilter] = useState('all');
  const [announcements, setAnnouncements] = useState(announcementsData);

  const filtered = announcements.filter((ann) => {
    if (filter === 'all') return true;
    return ann.role === filter;
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Announcements</h1>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['all', 'teacher', 'admin'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest uppercase px-3 py-2 border transition-colors ${
                filter === f
                  ? 'border-accent text-accent bg-navy'
                  : 'border-[#222] text-[#555] hover:border-accent'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Announcements */}
        <div className="space-y-3">
          {filtered.map((ann) => (
            <div key={ann.id} className="bg-black border border-[#222] p-4 hover:bg-navy transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-syne font-bold text-white">{ann.title}</h3>
                <span className="font-mono text-xs text-accent tracking-widest uppercase">
                  {ann.role}
                </span>
              </div>
              <p className="text-white text-sm mb-3">{ann.body}</p>
              <div className="font-mono text-xs text-[#555]">
                Posted by {ann.postedBy} · {new Date(ann.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
