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

  return (
    <>
      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={{ id: id || "99", type, title, price, agencyName }} 
      />
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
      >
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#001F5C] shadow-sm flex items-center gap-1">
          {type === 'service' ? '🎭 Servicio' : '🎂 Producto'}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate mr-2">{agencyName}</p>
          <div className="flex items-center gap-1 bg-[#FFDB00]/20 px-2 py-0.5 rounded-full text-[#001F5C]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#e6c600]">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-[#001F5C] transition-colors">{title}</h3>
        
        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
          <p className="text-3xl font-black text-[#001F5C]">${price.toLocaleString('es-MX')}</p>
          <div className="bg-[#001F5C] hover:bg-[#001F5C]/90 text-white rounded-full p-2.5 transition-colors shadow-sm">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
               <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
             </svg>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
