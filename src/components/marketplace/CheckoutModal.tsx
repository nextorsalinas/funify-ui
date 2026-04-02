"use client";

import { useState } from 'react';
import { X, Calendar, MapPin, User, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string | number;
    type: 'service' | 'product';
    title: string;
    price: number;
    agencyName: string;
  };
}

export default function CheckoutModal({ isOpen, onClose, item }: CheckoutModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    eventLocation: '',
    clientNotes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      
      const payload = {
        // Hardcoding agency_id to 1 for this Sprint prototype until Agency Auth is ready
        agency_id: 1, 
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        client_phone: formData.clientPhone,
        event_date: formData.eventDate,
        event_location: formData.eventLocation,
        client_notes: formData.clientNotes,
        items: [
          {
            id: item.id,
            type: item.type === 'service' ? 'Service' : 'Product',
            quantity: 1,
            price: item.price
          }
        ]
      };

      const response = await fetch(`${apiUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Error al enviar solicitud: " + (data.error || "Falla en el servidor"));
      }

    } catch (error) {
      console.error(error);
      alert('Error de conexión al enviar la reserva.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-[#001F5C]">Solicitar {item.type === 'service' ? 'Servicio' : 'Producto'}</h2>
            <p className="text-sm text-gray-500 font-medium">Proveedor: {item.agencyName}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#001F5C]">¡Solicitud Enviada!</h3>
            <p className="text-gray-500">
              El proveedor <strong>{item.agencyName}</strong> ha recibido tu solicitud para <strong>{item.title}</strong>. Pronto se pondrán en contacto contigo.
            </p>
            <button 
              onClick={onClose}
              className="mt-6 bg-[#001F5C] hover:bg-[#001540] text-white font-bold py-3 px-8 rounded-xl transition-all"
            >
              Cerrar y seguir explorando
            </button>
          </div>
        ) : (
          /* Form State */
          <div className="overflow-y-auto p-6 flex-1">
            {/* Resumen del Item */}
            <div className="bg-[#FFDB00]/10 border border-[#FFDB00]/30 rounded-xl p-4 mb-6 flex justify-between items-center">
              <div>
                <p className="font-bold text-[#001F5C]">{item.title}</p>
                <p className="text-sm text-[#001F5C]/70">x1 Unidad (Anticipo de Solicitud)</p>
              </div>
              <p className="text-lg font-black text-[#001F5C]">${item.price.toLocaleString('es-MX')}</p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 border-b pb-2">Datos de Contacto</h4>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" name="clientName" value={formData.clientName} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFDB00] focus:border-[#FFDB00] outline-none transition-all" placeholder="Ej. Juan Pérez" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono/WhatsApp <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input required type="tel" name="clientPhone" value={formData.clientPhone} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFDB00] focus:border-[#FFDB00] outline-none transition-all" placeholder="10 dígitos" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input required type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFDB00] focus:border-[#FFDB00] outline-none transition-all" placeholder="correo@ejemplo.com" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-gray-900 border-b pb-2">Detalles del Evento</h4>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha y Hora <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFDB00] focus:border-[#FFDB00] outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">C.P. / Colonia / Dirección Gral. <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                    <textarea required name="eventLocation" value={formData.eventLocation} onChange={handleChange} rows={2} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FFDB00] focus:border-[#FFDB00] outline-none transition-all resize-none" placeholder="Lugar aproximado donde será el evento" />
                  </div>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* Footer Actions */}
        {!isSuccess && (
          <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              form="checkout-form"
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center justify-center min-w-[160px] px-6 py-2.5 bg-[#FFDB00] hover:bg-[#e6c600] text-[#001F5C] font-black rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Solicitando...</>
              ) : (
                'Enviar Solicitud'
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
