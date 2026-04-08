import React from 'react';

export const RoleCard = ({ icon: Icon, label, sublabel, onClick, isActive, description }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col items-center justify-between p-8 border-0 hover:bg-navy transition-colors duration-500 ease-in-out group min-h-64"
    >
      <div className="flex flex-col items-center flex-1 justify-start">
        <div className="text-[#555] font-mono text-xs tracking-widest uppercase mb-4">
          {label} / {sublabel}
        </div>
        <Icon size={48} className="mb-6 text-white group-hover:text-accent transition-colors duration-500" />
      </div>

      <div className="flex flex-col items-center flex-1 justify-center">
        <h3 className="font-syne text-2xl md:text-3xl font-bold text-white mb-4 text-center">
          {sublabel}
        </h3>
        <p className="text-white text-xs md:text-sm text-center leading-relaxed mb-8 px-2 text-[#999] group-hover:text-white transition-colors duration-500">
          {description || 'Access your portal'}
        </p>
      </div>

      <div className="text-accent font-mono text-xs tracking-widest uppercase hover:text-white transition-colors duration-500">
        Enter →
      </div>
    </button>
  );
};
