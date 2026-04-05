// components/dashboard/AddInventoryModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editItem?: any;
}

export default function AddInventoryModal({ isOpen, onClose, onSuccess, editItem }: Props) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'Servicio' | 'Producto'>('Servicio');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Efecto para cargar datos si se va a editar
  React.useEffect(() => {
    if (editItem && isOpen) {
      setType(editItem.type === 'Servicio' ? 'Servicio' : 'Producto');
      // No podemos setear el valor de los inputs directamente si no son controlados, 
      // pero el componente se reseteará al abrirse/cerrarse.
    } else {
      setImagePreview(null);
    }
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    if (editItem) {
        formData.append('_method', 'POST'); // Laravel workaround for PUT/Files if needed, but we used POST route for simplicity
    }

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };
    const token = getCookie('funifay_token');

    // Recuperar el ID de la agencia desde el localStorage
    const agencyData = localStorage.getItem('funifay_agency');
    if (agencyData) {
      try {
        const agency = JSON.parse(agencyData);
        if (agency.id) {
          formData.append('agency_id', agency.id);
        }
      } catch (e) {
        console.error("Error parsing agency from storage", e);
      }
    }

    let endpoint = type === 'Servicio' ? '/api/dashboard/services' : '/api/dashboard/products';
    if (editItem) {
        endpoint += `/${editItem.id}`;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST', // We use POST for both create and update (with files)
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData, 
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'No se pudo guardar'}`);
      }
    } catch (err) {
      console.error("Error al enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-[#001F5C]">{editItem ? 'Editar' : 'Agregar Nuevo'} {type}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
          {/* Selector de Tipo (En edición debería estar bloqueado o condicionado) */}
          <div className={`flex bg-gray-100 p-1 rounded-lg ${editItem ? 'opacity-50 pointer-events-none' : ''}`}>
            {(['Servicio', 'Producto'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  type === t ? 'bg-white text-[#001F5C] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
            <input type="hidden" name="type" value={type} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input name="title" required defaultValue={editItem?.name} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDB00] outline-none" placeholder="Ej. Show de Magia" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (MXN)</label>
                <input name="price" type="number" step="0.01" required defaultValue={editItem?.price_raw || editItem?.price?.replace(/[^0-9.]/g, '')} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDB00] outline-none" placeholder="0.00" />
              </div>
              {type === 'Producto' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input name="stock" type="number" required defaultValue={editItem?.stock} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDB00] outline-none" placeholder="0" />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select name="category" defaultValue={editItem?.category} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDB00] outline-none bg-white">
                    <option value="magia">Magos</option>
                    <option value="inflables">Inflables</option>
                    <option value="comida">Comida/Pasteles</option>
                    <option value="animacion">Animadores</option>
                  </select>
                </div>
              )}
            </div>

            {type === 'Producto' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select name="category" defaultValue={editItem?.category} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDB00] outline-none bg-white">
                  <option value="juguetes">Juguetes</option>
                  <option value="decoracion">Decoración</option>
                  <option value="disfraces">Disfraces</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea name="description" rows={3} defaultValue={editItem?.description} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDB00] outline-none" placeholder="Describe brevemente lo que ofreces..."></textarea>
            </div>

            {/* Upload de Imagen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagen del {type} {editItem && '(Opcional)'}</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-[#FFDB00] transition-colors group cursor-pointer">
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} required={!editItem} className="absolute inset-0 opacity-0 cursor-pointer" />
                {imagePreview || editItem?.image_url ? (
                  <img src={imagePreview || editItem.image_url} alt="Preview" className="h-32 w-full object-cover rounded-lg" />
                ) : (
                  <div className="text-center py-4">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto group-hover:text-[#FFDB00]" />
                    <p className="mt-2 text-xs text-gray-500">Click para subir (JPG, PNG máx 2MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001F5C] text-white font-bold py-3 rounded-xl hover:bg-[#001F5C]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : editItem ? 'Guardar Cambios' : 'Guardar en Inventario'}
          </button>
        </form>
      </div>
    </div>
  );
}