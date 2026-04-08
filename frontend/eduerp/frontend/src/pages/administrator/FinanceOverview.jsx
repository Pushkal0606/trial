import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { financeData } from '../../mock/finance';

export const FinanceOverview = () => {
  const [finance, setFinance] = useState(financeData);
  const [filter, setFilter] = useState('all');

  const filtered = finance.filter((f) => {
    if (filter === 'all') return true;
    return f.feeStatus === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'text-accent border-accent';
      case 'UNPAID':
        return 'text-red-400 border-red-900';
      case 'PARTIAL':
        return 'text-yellow-500 border-yellow-900';
      default:
        return 'text-white border-[#555]';
    }
  };

  const stats = {
    paid: finance.filter((f) => f.feeStatus === 'PAID').length,
    unpaid: finance.filter((f) => f.feeStatus === 'UNPAID').length,
    partial: finance.filter((f) => f.feeStatus === 'PARTIAL').length,
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-white mb-6">Finance Overview</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Paid', value: stats.paid, color: 'text-accent' },
            { label: 'Unpaid', value: stats.unpaid, color: 'text-red-400' },
            { label: 'Partial', value: stats.partial, color: 'text-yellow-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-black border border-[#222] p-4 text-center">
              <div className={`font-syne text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[#555] tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['all', 'PAID', 'UNPAID', 'PARTIAL'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest uppercase px-3 py-2 border transition-colors ${
                filter === f
                  ? 'border-accent text-accent bg-navy'
                  : 'border-[#222] text-[#555] hover:border-accent'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#222]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#222] bg-[#0a0a0a]">
                {['Student Name', 'Fee Status', 'Amount', 'Due Date'].map((h) => (
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
              {filtered.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
                >
                  <td className="px-4 py-3 text-white text-sm">{entry.name}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs px-2 py-1 border ${getStatusColor(entry.feeStatus)}`}>
                      {entry.feeStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white text-sm">₹{entry.amount}</td>
                  <td className="px-4 py-3 text-white text-sm font-mono">
                    {new Date(entry.dueDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};
