"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  ClipboardList,
  Menu,
  X
} from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';
import UserProfile from '@/components/dashboard/UserProfile';
import PendingCountBadge from '@/components/dashboard/PendingCountBadge';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Protección Capa 2: Verificación de cliente (Fail-safe en producción)
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    
    const token = getCookie('funifay_token');
    if (!token) {
      window.location.href = '/auth/login';
      return;
    }
    
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#001F5C]"></div>
      </div>
    );
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const NavLinks = () => (
    <nav className="flex-1 px-4 py-6 space-y-2 relative">
      <div className="mb-8">
        <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Panel</p>
        <Link 
          href="/dashboard" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center px-3 py-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors group font-medium"
        >
          <LayoutDashboard className="w-5 h-5 mr-3 text-[#FFDB00]" />
          Resumen
        </Link>

        <Link 
          href="/dashboard/orders" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center justify-between px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium mt-1"
        >
          <div className="flex items-center">
            <ClipboardList className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
            Mis Reservas
          </div>
          <PendingCountBadge />
        </Link>
      </div>

      <div className="mb-8">
        <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Inventario</p>
        <Link 
          href="/dashboard/services" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium"
        >
          <Package className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
          Mis Servicios
        </Link>
        <Link 
          href="/dashboard/products" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium mt-1"
        >
          <ShoppingBag className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
          Mis Productos
        </Link>
      </div>

      <div className="mb-8">
        <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Desempeño</p>
        <Link 
          href="/dashboard/metrics" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium"
        >
          <BarChart3 className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
          Métricas
        </Link>
      </div>

      <div>
        <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Cuenta</p>
        <Link 
          href="/dashboard/settings" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium"
        >
          <Settings className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
          Ajustes de Perfil
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans relative overflow-x-hidden">
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#001F5C] text-white sticky top-0 z-50 shadow-md">
        <Link href="/dashboard" className="text-xl font-black text-[#FFDB00] tracking-tight">
          Funifay <span className="text-white text-base">Negocios</span>
        </Link>
        <button onClick={toggleSidebar} className="p-2 text-[#FFDB00] hover:bg-white/10 rounded-lg transition-colors">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-[#001F5C] text-white min-h-screen sticky top-0 shadow-xl z-20 transition-all duration-300">
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-black text-[#FFDB00] tracking-tight hover:opacity-90 transition-opacity">
            Funifay <br/>
            <span className="text-white text-lg font-medium tracking-normal">Negocios</span>
          </Link>
        </div>
        <NavLinks />
        <div className="p-4 border-t border-white/10 relative">
          <UserProfile />
          <LogoutButton />
        </div>
      </aside>

      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar Mobile */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-[#001F5C] text-white z-40 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 flex justify-between items-center bg-[#00143D]">
          <span className="text-xl font-black text-[#FFDB00]">Navegación</span>
          <button onClick={toggleSidebar} className="p-2 text-white/50 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <NavLinks />
        <div className="p-4 border-t border-white/10">
          <UserProfile />
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative flex flex-col w-full">
        <div className="flex-1 p-4 sm:p-6 md:p-8 relative">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
