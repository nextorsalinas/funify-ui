import React from 'react';
import { Calendar, MapPin, User, Mail, Phone, Clock, FileText } from 'lucide-react';

async function fetchOrders() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  try {
    const res = await fetch(`${apiUrl}/api/dashboard/orders`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export default async function OrdersPage() {
  const orders = await fetchOrders();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-[#001F5C] tracking-tight">Solicitudes de Clientes</h1>
        <p className="text-gray-500 mt-2 font-medium break-words">Gestiona las reservas y pedidos recibidos de tu perfil público</p>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center">
            <h3 className="text-xl font-bold text-gray-500">Aún no hay solicitudes</h3>
            <p className="text-gray-400 mt-2">Pronto recibirás reservas para tus servicios y productos.</p>
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
              <div className="bg-[#FFDB00]/10 px-6 py-4 border-b border-[#FFDB00]/20 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#001F5C] text-white px-3 py-1 text-sm font-bold rounded-lg tracking-wider">
                    RESERVA #{order.id}
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    {new Date(order.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-yellow-100 text-yellow-700">
                    {order.status === 'pending' ? '⏳ PENDIENTE' : order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Client Details */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#001F5C] text-lg border-b pb-2">Información del Cliente</h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3 text-gray-700 overflow-hidden">
                      <User className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="font-semibold break-all">{order.client_name}</span>
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 overflow-hidden">
                      <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="break-all">{order.client_email}</span>
                    </p>
                    <p className="flex items-center gap-3 text-gray-700">
                      <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                      {order.client_phone}
                    </p>
                  </div>

                  <h3 className="font-bold text-[#001F5C] text-lg border-b pb-2 mt-6">Detalles del Evento</h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                      <span className="font-semibold">
                        {new Date(order.event_date).toLocaleString('es-MX')}
                      </span>
                    </p>
                    <p className="flex items-start gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <span className="leading-snug break-words">{order.event_location}</span>
                    </p>
                    {order.client_notes && (
                      <div className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl mt-2 border border-gray-100">
                        <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                        <span className="text-sm italic break-words">{order.client_notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items and Total */}
                <div className="space-y-4">
                  <h3 className="font-bold text-[#001F5C] text-lg border-b pb-2">Artículos Solicitados</h3>
                  <div className="space-y-3">
                    {order.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="pr-4">
                          <p className="font-bold text-gray-900 line-clamp-1 w-full max-w-[200px]">
                            {item.purchasable?.name || 'Artículo Desconocido'}
                          </p>
                          <p className="text-xs text-gray-500 font-semibold uppercase mt-1">
                            {item.purchasable_type.includes('Service') ? '🎭 Servicio' : '🎂 Producto'} • {item.quantity} Unidad(es)
                          </p>
                        </div>
                        <p className="font-black text-[#001F5C] shrink-0">
                          ${Number(item.price_at_booking).toLocaleString('es-MX')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center bg-[#001F5C] text-white p-5 rounded-2xl mt-6 shadow-md w-full">
                    <span className="font-semibold text-lg opacity-90">Total Acordado</span>
                    <span className="text-3xl font-black truncate max-w-[50%] text-right">${Number(order.total_amount).toLocaleString('es-MX')}</span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-white border-2 border-red-100 text-red-500 hover:bg-red-50 font-bold py-3 px-4 rounded-xl transition-colors">
                      Rechazar
                    </button>
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                      Aceptar Reserva
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
