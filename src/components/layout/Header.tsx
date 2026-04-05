'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, User, ShoppingCart, Heart, ChevronRight } from 'lucide-react';

export default function Header() {
  const navLinks = [
    "Cumpleaños", "Pasteles y Botanas", "Personalizados", "Regalos", "Inflables", "Magos y Payasos", "Eventos", "Decoraciones"
  ];

  return (
    <header className="w-full bg-white flex flex-col z-50 sticky top-0 shadow-sm">
      {/* Search & Logo Row (White Background) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 md:py-4 border-b border-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Level 2 (Mobile) / Logo Row (Desktop) */}
          <div className="flex items-center justify-between w-full md:w-auto min-h-[90px] py-1">
            {/* Logo (Equilibrio perfecto: +50% tamaño) */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative w-[225px] h-[90px] md:w-16 md:h-16">
                <Image 
                  src="/images/logo_funi.svg" 
                  alt="Funifay Logo" 
                  fill 
                  className="object-contain object-left"
                  priority
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#001F5C] tracking-tighter hidden sm:block">
                Funifay<span className="text-[#e91e63]">.</span>
              </h1>
            </Link>

            {/* Icons (Right Side Mobile - Reducidos 10% y Centrados) */}
            <div className="flex items-center justify-center gap-2 text-[#001F5C] md:hidden">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors font-medium">
                <User size={25} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart size={25} strokeWidth={2} />
                <span className="absolute top-1 right-1 bg-[#e91e63] text-white text-[9px] font-black min-w-[17px] h-[17px] rounded-full flex items-center justify-center border-2 border-white">0</span>
              </button>
            </div>
          </div>

          {/* Level 3 (Mobile) / Search Bar */}
          <div className="w-full md:flex-1 md:max-w-2xl relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="¿Qué buscas para tu fiesta?"
                className="w-full bg-[#f1f3f5] rounded-full pl-6 pr-12 py-3.5 md:py-3 text-[15px] font-medium text-[#001F5C] focus:outline-none focus:ring-4 focus:ring-[#FFDB00]/30 border-none placeholder:text-gray-500 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 md:p-2 bg-[#001F5C] rounded-full text-white cursor-pointer hover:bg-[#001540] transition-colors">
                <Search className="w-5 h-5 md:w-[18px] md:h-[18px]" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Desktop Only Icons */}
          <div className="hidden md:flex items-center gap-5 text-[#001F5C]">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={24} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User size={26} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart size={26} strokeWidth={2} />
              <span className="absolute top-0 right-0 bg-[#e91e63] text-white text-[10px] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Level 4 (Mobile) / Navigation (Categorías) */}
      <nav className="bg-white w-full border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-start lg:justify-center gap-6 sm:gap-10 py-3.5">
            {navLinks.map((link) => (
              <li key={link} className="flex-shrink-0">
                <Link
                  href="#"
                  className="text-[14px] font-black text-[#001F5C]/70 hover:text-[#e91e63] transition-colors uppercase tracking-tight whitespace-nowrap"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
