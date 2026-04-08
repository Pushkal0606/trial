import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-[#111] h-20 mb-4"></div>
      <div className="bg-[#111] h-12 mb-2"></div>
      <div className="bg-[#111] h-12 mb-2"></div>
      <div className="bg-[#111] h-12 mb-2"></div>
      <div className="bg-[#111] h-12 mb-2"></div>
      <div className="bg-[#111] h-12"></div>
    </div>
  );
};
