'use client';

import React, { useState } from 'react';
import {
  Users,
  Star,
  Package,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  X,
  Upload,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import AddInventoryModal from './AddInventoryModal';

// --- Componente Principal de la Página ---
export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [agencyName, setAgencyName] = useState('Emprendedor');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  React.useEffect(() => {
    // Cargar datos de la agencia localmente
    const savedAgency = localStorage.getItem('funifay_agency');
    if (savedAgency) {
      try {
        const agency = JSON.parse(savedAgency);
        if (agency.name) setAgencyName(agency.name);
      } catch (e) {
        console.error("Error parsing agency from local storage", e);
      }
    }

    const fetchInventory = async () => {
      setLoadingTasks(true);
      try {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(';').shift();
        };
        const token = getCookie('funifay_token');

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/inventory`, {
          headers: {
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((item: any) => ({
            ...item,
            id: item.id,
            name: item.name || item.title,
            type: item.type,
            price_raw: item.price,
            price: `$${Number(item.price).toLocaleString()} MXN`,
            status: (item.is_active ?? true) ? 'Activo' : 'Pausado'
          }));
          setInventory(formatted);
        }
      } catch (err) {
        console.error("Error fetching inventory", err);
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchInventory();
  }, [triggerRefresh]);

  const handleDelete = async (id: number, type: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este artículo? esta acción no se puede deshacer.')) return;

    try {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const token = getCookie('funifay_token');
      const endpoint = type === 'Servicio' ? `/api/dashboard/services/${id}` : `/api/dashboard/products/${id}`;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (res.ok) {
        setTriggerRefresh(prev => !prev);
      } else {
        alert('No se pudo eliminar el artículo');
      }
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleToggleStatus = async (item: any) => {
    try {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const token = getCookie('funifay_token');
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/inventory/${item.id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ type: item.type })
      });

      if (res.ok) {
        setTriggerRefresh(prev => !prev);
      }
    } catch (err) {
      console.error("Error toggling status", err);
    }
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  // Mock data (en el futuro vendrá de un fetch)
  const stats = [
    { name: 'Visitas a la Vitrina', value: '1,245', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Calificación', value: '4.8', change: 'Estable', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Servicios Activos', value: '12', change: '+2 nuevos', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Productos Activos', value: '45', change: '-3 agotados', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  const handleRefreshData = () => {
    console.log("Datos guardados. Actualizando la lista...");
    setTriggerRefresh(prev => !prev);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 capitalize">Hola, {agencyName} 👋</h1>
          <p className="text-gray-500 mt-1">Aquí tienes un resumen del desempeño de tu negocio hoy.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-3 bg-[#FFDB00] text-[#001F5C] font-extrabold rounded-xl shadow-lg hover:bg-[#FFDB00]/90 transition-all active:scale-95 group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Agregar Nuevo
        </button>
      </div>

      {/* Stats Grid - Hidden on Mobile for a cleaner professional look */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Inventario Activo</h2>
          <button className="text-sm text-[#001F5C] font-semibold hover:underline transition-colors">Ver todos</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">Nombre / Artículo</th>
                <th scope="col" className="px-6 py-4 font-bold">Tipo</th>
                <th scope="col" className="px-6 py-4 font-bold">Precio</th>
                <th scope="col" className="px-6 py-4 font-bold">Estado</th>
                <th scope="col" className="px-6 py-4 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                      {item.type === 'Servicio' ? <Package className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-bold">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.is_active ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                      {item.is_active ? 'Activo' : 'Pausado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleToggleStatus(item)}
                        className={`transition-colors ${item.is_active ? 'text-gray-400 hover:text-orange-500' : 'text-orange-500 hover:text-green-500'}`}
                        title={item.is_active ? 'Pausar (Ocultar del Marketplace)' : 'Activar (Mostrar en Marketplace)'}
                      >
                        {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-gray-400 hover:text-[#001F5C] transition-colors" 
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id, item.type)}
                        className="text-gray-400 hover:text-red-600 transition-colors" 
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-700 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loadingTasks && (
            <div className="p-12 text-center text-gray-500 font-medium flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#001F5C]" />
              <span>Cargando inventario...</span>
            </div>
          )}

          {!loadingTasks && inventory.length === 0 && (
            <div className="p-12 text-center text-gray-400 font-medium">
              No tienes inventario registrado aún.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center text-xs text-gray-500 font-semibold">
          <span>Página 1 de 1</span>
          <div className="flex gap-2">
            <button disabled className="px-4 py-1.5 rounded-lg bg-white border border-gray-200 disabled:opacity-50">Anterior</button>
            <button disabled className="px-4 py-1.5 rounded-lg bg-white border border-gray-200 disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Modal de Agregar / Editar */}
      <AddInventoryModal
        isOpen={isModalOpen}
        editItem={selectedItem}
        onClose={closeModal}
        onSuccess={handleRefreshData}
      />
    </div>
  );
}