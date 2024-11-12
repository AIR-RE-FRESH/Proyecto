import React from 'react';

export default function Table({ children, className = '', theme = 'light' }) {
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-600';

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full ${bgColor} border ${borderColor} rounded-lg ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className = '', theme = 'light' }) {
  const bgColor = theme === 'light' ? 'bg-gray-50' : 'bg-gray-700';
  return <thead className={`${bgColor} ${className}`}>{children}</thead>;
}

export function TableRow({ children, className = '', theme = 'light' }) {
  const borderColor = theme === 'light' ? 'border-gray-200' : 'border-gray-600';
  return <tr className={`border-b ${borderColor} ${className}`}>{children}</tr>;
}

export function TableHeader({ children, className = '', theme = 'light' }) {
  const textColor = theme === 'light' ? 'text-gray-500' : 'text-gray-300';
  return (
    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textColor} ${className}`}>
      {children}
    </th>
  );
}

export function TableBody({ children, className = '', theme = 'light' }) {
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const divideColor = theme === 'light' ? 'divide-gray-200' : 'divide-gray-600';
  return <tbody className={`${bgColor} divide-y ${divideColor} ${className}`}>{children}</tbody>;
}

export function TableCell({ children, className = '', theme = 'light', textColor = 'text-gray-500' }) {
  const dynamicTextColor = theme === 'light' ? textColor : 'text-gray-300';
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm ${dynamicTextColor} ${className}`}>
      {children}
    </td>
  );
}
