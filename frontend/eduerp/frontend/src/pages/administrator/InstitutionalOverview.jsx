import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { studentsData } from '../../mock/students';
import { teachersData } from '../../mock/teachers';

export const InstitutionalOverview = () => {
  const departments = {
    'Computer Science': 25,
    'Electronics': 18,
    'Mechanical': 22,
    'Civil': 12,
  };

  const genderRatio = {
    Male: 65,
    Female: 35,
  };

  const staffByRole = {
    'Full-time Faculty': 12,
    'Part-time Faculty': 8,
    'Administrative Staff': 15,
    'Support Staff': 10,
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Institutional Overview</h1>

        {/* Enrollment by Department */}
        <div className="mb-8">
          <h2 className="font-syne text-lg font-bold text-white mb-4">Enrollment by Department</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(departments).map(([dept, count]) => (
              <div
                key={dept}
                className="bg-black border border-[#222] p-4 hover:border-t-4 hover:border-t-accent transition-all text-center"
              >
                <div className="font-syne text-3xl font-bold text-accent mb-1">
                  {count}
                </div>
                <div className="font-mono text-xs text-[#555] tracking-widest uppercase">
                  {dept}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Ratio */}
        <div className="mb-8">
          <h2 className="font-syne text-lg font-bold text-white mb-4">Gender Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(genderRatio).map(([gender, percentage]) => (
              <div
                key={gender}
                className="bg-black border border-[#222] p-4 hover:border-t-4 hover:border-t-accent transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-syne font-bold text-white">{gender}</div>
                  <span className="text-accent font-mono text-sm">{percentage}%</span>
                </div>
                <div className="w-full bg-[#0a0a0a] border border-[#222] h-3">
                  <div
                    className="bg-accent h-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff by Role */}
        <div>
          <h2 className="font-syne text-lg font-bold text-white mb-4">Staff Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(staffByRole).map(([role, count]) => (
              <div
                key={role}
                className="bg-black border border-[#222] p-4 hover:border-t-4 hover:border-t-accent transition-all text-center"
              >
                <div className="font-syne text-3xl font-bold text-accent mb-1">
                  {count}
                </div>
                <div className="font-mono text-xs text-[#555] tracking-widest uppercase line-clamp-2">
                  {role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
