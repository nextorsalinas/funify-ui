import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  ClipboardList
} from 'lucide-react';

async function fetchPendingCount() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${apiUrl}/api/dashboard/orders/pending-count`, { cache: 'no-store' });
    if (!res.ok) return 0;
    const json = await res.json();
    return json.count || 0;
  } catch (error) {
    return 0;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pendingCount = await fetchPendingCount();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-[#001F5C] text-white min-h-screen sticky top-0 shadow-xl z-20 transition-all duration-300">
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-black text-[#FFDB00] tracking-tight hover:opacity-90 transition-opacity">
            Funifay <br/>
            <span className="text-white text-lg font-medium tracking-normal">Negocios</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 relative">
          
          <div className="mb-8">
            <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Panel</p>
            <Link 
              href="/dashboard" 
              className="flex items-center px-3 py-2.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors group font-medium"
            >
              <LayoutDashboard className="w-5 h-5 mr-3 text-[#FFDB00]" />
              Resumen
            </Link>

            <Link 
              href="/dashboard/orders" 
              className="flex items-center justify-between px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium mt-1"
            >
              <div className="flex items-center">
                <ClipboardList className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
                Mis Reservas
              </div>
              {pendingCount > 0 && (
                <span className="bg-[#FFDB00] text-[#001F5C] text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                  {pendingCount}
                </span>
              )}
            </Link>
          </div>

          <div className="mb-8">
            <p className="px-3 text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Inventario</p>
            <Link 
              href="/dashboard/services" 
              className="flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium"
            >
              <Package className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
              Mis Servicios
            </Link>
            <Link 
              href="/dashboard/products" 
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
              className="flex items-center px-3 py-2.5 text-white/80 rounded-lg hover:bg-white/10 hover:text-white transition-colors group font-medium"
            >
              <Settings className="w-5 h-5 mr-3 text-white/50 group-hover:text-white transition-colors" />
              Ajustes de Perfil
            </Link>
          </div>

        </nav>

        {/* User Profile & Logout at bottom */}
        <div className="p-4 border-t border-white/10 relative">
          <div className="flex items-center mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-[#FFDB00] shadow-inner">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white line-clamp-1">Agencia Fiesta</p>
              <p className="text-xs text-white/60 line-clamp-1">admin@fiesta.com</p>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm text-[#FFDB00] bg-white/5 hover:bg-white/10 hover:text-white transition-colors rounded-lg font-medium border border-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen relative flex flex-col">
        
        {/* Dynamic Page Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 relative">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>

      </main>
    </div>
  );
}
