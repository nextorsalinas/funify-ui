"use client";

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Borrar la cookie y el localStorage
    document.cookie = 'funifay_token=; Max-Age=0; path=/';
    localStorage.removeItem('funifay_user');
    localStorage.removeItem('funifay_agency');
    
    // Forzar la redirección
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center justify-center px-4 py-2 text-sm text-[#FFDB00] bg-white/5 hover:bg-white/10 hover:text-white transition-colors rounded-lg font-medium border border-white/10"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Cerrar Sesión
    </button>
  );
}
