'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Productos</h1>
          <p className="text-gray-500 mt-1">Gestiona el inventario de productos físicos.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">Próximamente</h2>
        <p className="text-gray-500">Estamos preparando esta sección para que gestiones tus productos físicos.</p>
      </div>
    </div>
  );
}
