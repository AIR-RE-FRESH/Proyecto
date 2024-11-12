import React from 'react';

export default function Alert({ variant = 'success', children, className = '' }) {
  let bgColor, borderColor;
  switch (variant) {
    case 'warning':
      bgColor = 'bg-yellow-200 text-yellow-700';
      borderColor = 'border-yellow-300';
      break;
    case 'danger':
      bgColor = 'bg-red-200 text-red-700';
      borderColor = 'border-red-300';
      break;
    default:
      bgColor = 'bg-green-100 text-green-700';
      borderColor = 'border-green-200';
  }

  return (
    <div className={`${bgColor} ${borderColor} border-2 p-4 rounded-md ${className}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = '' }) {
  return <h3 className={`font-bold text-lg ${className}`}>{children}</h3>;
}

export function AlertDescription({ children, className = '' }) {
  return <p className={`text-sm ${className}`}>{children}</p>;
}
