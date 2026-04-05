'use client';

import React from 'react';

export default function TopAnnouncement() {
  return (
    <div className="w-full bg-[#001F5C] py-3 px-2 flex justify-center items-center text-center">
      <p className="text-white font-black text-sm sm:text-base md:text-lg tracking-tight leading-tight">
        <span className="text-[#FFDB00]">¡Nuevo!</span> Reserva tu servicio con solo el <span className="text-[#FFDB00]">10%</span> y lo demas lo pagas contra entrega.
      </p>
    </div>
  );
}
