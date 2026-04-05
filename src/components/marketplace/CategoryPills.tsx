'use client';

import React from 'react';

const categories = [
  { name: 'Magos', icon: '✨', color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Pasteles', icon: '🎂', color: 'bg-pink-100 text-pink-600' },
  { name: 'Inflables', icon: '🎈', color: 'bg-blue-100 text-blue-600' },
  { name: 'Payasos', icon: '🤡', color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Shows', icon: '🎭', color: 'bg-purple-100 text-purple-600' },
  { name: 'Regalos', icon: '🎁', color: 'bg-red-100 text-red-600' },
  { name: 'Comida', icon: '🍿', color: 'bg-orange-100 text-orange-600' },
  { name: 'Decoración', icon: '🎈', color: 'bg-teal-100 text-teal-600' },
];

export default function CategoryPills() {
  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4 overflow-x-auto no-scrollbar scroll-smooth">
          <button className="flex-none bg-[#001F5C] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-smooth hover:scale-105 active:scale-95">
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`flex-none flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-smooth hover:scale-105 active:scale-95 border border-transparent hover:border-gray-200 bg-gray-50 text-gray-700`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
