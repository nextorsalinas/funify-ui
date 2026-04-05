'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Métricas de Desempeño</h1>
          <p className="text-gray-500 mt-1">Analiza el impacto de tu negocio en Funifay.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <BarChart3 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">En Desarrollo</h2>
        <p className="text-gray-500">Próximamente verás aquí gráficas de visitas y conversiones.</p>
      </div>
    </div>
  );
}
