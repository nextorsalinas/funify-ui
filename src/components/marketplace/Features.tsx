'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'Busca y Compara',
    description: 'Encuentra magos, pasteles, inflables y más en un solo lugar con precios reales.',
    icon: (
      <svg className="w-8 h-8 text-[#e91e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Aparta con el 10%',
    description: 'Reserva la fecha pagando solo el 10% online. El resto se paga contraentrega.',
    icon: (
      <svg className="w-8 h-8 text-[#e91e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Disfruta el Evento',
    description: 'Recibe un servicio verificado y de alta calidad para crear recuerdos mágicos.',
    icon: (
      <svg className="w-8 h-8 text-[#e91e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Header */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl font-black text-[#001F5C] leading-tight mb-6">
              Planea la fiesta perfecta <br />
              <span className="text-[#e91e63]">sin complicaciones</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              En Funifay sabemos que tu familia es lo más importante. Por eso hemos creado un sistema de reserva transparente y seguro donde tú tienes el control.
            </p>
            <div className="space-y-4">
              {['Proveedores verificados', 'Atención personalizada', 'Reserva segura en línea'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-none w-6 h-6 rounded-full bg-[#FFDB00] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#001F5C]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-bold text-[#001F5C]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-[#FFDB00]/20 rounded-[3rem] blur-2xl -z-10 transform rotate-3"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/images/planning_family.png"
                alt="Familia planeando fiesta"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="relative group p-8 rounded-3xl transition-smooth hover:bg-[#F8FAFC]">
              <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth group-hover:bg-white group-hover:shadow-xl">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-[#001F5C] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
