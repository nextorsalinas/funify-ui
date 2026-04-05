'use client';

import React from 'react';
import Link from 'next/link';

export default function SupplierBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
      <div className="relative bg-[#001F5C] rounded-[3rem] overflow-hidden p-10 sm:p-20 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFDB00]/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#e91e63]/10 rounded-full blur-3xl -z-0"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-3/5 text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
              ¿Tienes una empresa <br />
              <span className="text-[#FFDB00]">de eventos infantiles?</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-medium">
              Únete a la mayor red de fiestas de la ciudad. Registra tu agencia y sube tus primeros <span className="text-[#FFDB00] font-bold">10 productos totalmente GRATIS</span> hoy mismo.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <Link 
              href="/auth/login" 
              className="bg-[#e91e63] hover:bg-[#c2185b] text-white font-black text-xl px-12 py-5 rounded-2xl shadow-lg transition-smooth transform hover:-translate-y-1 active:scale-95"
            >
              REGISTRAR MI AGENCIA
            </Link>
            <p className="text-white/60 text-sm font-bold flex items-center gap-2">
              <svg className="w-4 h-4 text-[#FFDB00]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sin tarjetas de crédito. Sin compromisos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
