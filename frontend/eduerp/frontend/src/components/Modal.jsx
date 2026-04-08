import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, footerActions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-black border border-[#222] w-full max-w-md">
        <div className="border-b border-[#222] px-6 py-4 flex justify-between items-center">
          <h2 className="font-syne font-bold text-white text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#555] hover:text-accent transition-colors">✕</button>
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
        {footerActions && (
          <div className="border-t border-[#222] px-6 py-4 flex gap-2 justify-end">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};
