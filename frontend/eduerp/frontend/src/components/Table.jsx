import React from 'react';

export const Table = ({ columns, data, onRowClick, actions }) => {
  return (
    <div className="w-full overflow-x-auto border border-[#222]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#222] bg-[#0a0a0a]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white"
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick && onRowClick(row)}
              className="border-b border-[#222] hover:bg-navy hover:border-l-4 hover:border-l-accent transition-all"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-white text-sm">
                  {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 flex gap-2">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                      className="text-accent hover:text-white text-sm font-mono transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
