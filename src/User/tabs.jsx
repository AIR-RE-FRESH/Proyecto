import React, { useState } from 'react';

export default function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent && child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-300">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, color = 'gray' }) {
  const colorClasses = {
    orange: {
      active: 'bg-orange-700 text-white',
      hover: 'hover:bg-orange-500 hover:text-white',
    },
    blue: {
      active: 'bg-blue-800 text-white',
      hover: 'hover:bg-blue-500 hover:text-white',
    },
    green: {
      active: 'bg-green-800 text-white',
      hover: 'hover:bg-green-500 hover:text-white',
    },
    teal: {
      active: 'bg-teal-800 text-white',
      hover: 'hover:bg-teal-700 hover:text-white',
    },
    yellow: {
      active: 'bg-yellow-700 text-white',
      hover: 'hover:bg-yellow-500 hover:text-white',
    },
    red: {
      active: 'bg-red-800 text-white',
      hover: 'hover:bg-red-500 hover:text-white',
    },
    gray: {
      active: 'bg-gray-800 text-white',
      hover: 'hover:bg-gray-300 hover:text-white',
    },
  };

  const activeColor = colorClasses[color].active;
  const inactiveHover = colorClasses[color].hover;

  return (
    <button
      className={`px-3 py-2 text-lg font-medium flex items-center justify-center space-x-1 ${
        activeTab === value ? activeColor : `bg-gray-300 text-gray-600 ${inactiveHover}`
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}




export function TabsContent({ value, children }) {
  // Este componente solo se renderiza si coincide con la pestaña activa
  return <div>{children}</div>;
}
