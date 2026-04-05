'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

// Componente del Banner Principal con llamado a la acción (Hero)
export default function HeroBanner() {
  return (
    <div className="relative w-full min-h-[600px] sm:min-h-[700px] flex justify-center items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero_party.png"
          alt="Funifay Party Hero"
          fill
          priority
          className="object-cover scale-105"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001f5c]/60 via-[#001f5c]/40 to-white"></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl -z-10 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center px-4 py-32 md:py-48">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] mb-8 max-w-5xl tracking-tight drop-shadow-2xl">
          Toda la magia <br className="hidden sm:block" />
          <span className="text-[#FFDB00]">para tu fiesta</span>
        </h1>
        
        <p className="text-xl sm:text-3xl font-bold text-white/95 max-w-3xl px-4 drop-shadow-lg mb-12 leading-relaxed">
          Encuentra magos divertidísimos, pasteles deliciosos e inflables asombrosos en un solo lugar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
          <button className="bg-[#e91e63] hover:bg-[#c2185b] text-white font-black text-xl sm:text-2xl px-12 py-6 rounded-2xl shadow-[0_15px_40px_-10px_rgba(233,30,99,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
            VER REGALOS Y SERVICIOS
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
