import React from 'react';

export default function Progress({ value, indicatorColor }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`${indicatorColor} h-2.5 rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
