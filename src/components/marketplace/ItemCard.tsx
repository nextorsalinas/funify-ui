"use client";

import Image from 'next/image';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

interface ItemCardProps {
  id?: string | number;
  type: 'service' | 'product';
  title: string;
  price: number;
  imageSrc: string;
  agencyName: string;
  rating: number;
}

export default function ItemCard({ id, type, title, price, imageSrc, agencyName, rating }: ItemCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookingFee = Math.round(price * 0.10);

  return (
    <>
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={{ id: id || "99", type, title, price, agencyName }} 
      />
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group bg-white rounded-3xl shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,31,92,0.15)] transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-4 left-4 glass px-4 py-1.5 rounded-full text-[10px] font-black text-[#001F5C] uppercase tracking-widest shadow-sm flex items-center gap-1.5">
            {type === 'service' ? '🎭 Servicio' : '🎂 Producto'}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-white/40">
             <div className="flex items-center gap-1 text-[#001F5C]">
               <svg className="w-3 h-3 text-[#FFDB00]" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
               <span className="text-xs font-black">{rating}</span>
             </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-[10px] font-black text-[#e91e63] uppercase tracking-[0.2em] mb-2 truncate">
            {agencyName}
          </p>
          
          <h3 className="font-bold text-gray-900 text-xl leading-snug mb-4 line-clamp-2 transition-colors">
            {title}
          </h3>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-400">Precio Total</span>
              <p className="text-3xl font-black text-[#001F5C] tracking-tighter">
                ${price.toLocaleString('es-MX')}
              </p>
            </div>
            
            <div className="bg-[#FFDB00]/10 border border-[#FFDB00]/30 rounded-2xl p-3 flex items-center justify-between group-hover:bg-[#FFDB00]/20 transition-smooth">
              <div>
                <p className="text-[10px] font-black text-[#001F5C]/60 uppercase leading-none">Aparta hoy con</p>
                <p className="text-lg font-black text-[#001F5C] leading-none mt-1">${bookingFee.toLocaleString('es-MX')}</p>
              </div>
              <div className="bg-[#001F5C] text-white rounded-xl py-2 px-4 text-xs font-black shadow-lg">
                RESERVAR ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
