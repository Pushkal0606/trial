import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { announcementsData } from '../mock/announcements';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  const recentAnnouncements = announcementsData.slice(0, 3);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-accent transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-accent text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="absolute right-0 mt-2 w-80 bg-black border border-[#222] z-50">
            <div className="border-b border-[#222] px-4 py-3">
              <h3 className="font-mono text-xs text-white tracking-widest uppercase font-bold">Latest Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {recentAnnouncements.length === 0 ? (
                <div className="px-4 py-6 text-center text-[#555]">No notifications</div>
              ) : (
                recentAnnouncements.map((ann) => (
                  <div key={ann.id} className="border-b border-[#222] px-4 py-3 hover:bg-navy transition-colors">
                    <p className="text-white text-sm font-syne font-bold line-clamp-1">{ann.title}</p>
                    <p className="text-[#555] text-xs font-mono mt-1">{ann.postedBy}</p>
                  </div>
                ))
              )}
            </div>
            {unreadCount > 0 && (
              <div className="border-t border-[#222] px-4 py-2">
                <button
                  onClick={markAsRead}
                  className="w-full text-accent font-mono text-xs tracking-widest uppercase hover:text-white transition-colors"
                >
                  Mark as Read
                </button>
              </div>
            )}
          </div>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};
