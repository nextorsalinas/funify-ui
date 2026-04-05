'use client';

import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ajustes de Perfil</h1>
          <p className="text-gray-500 mt-1">Personaliza la información de tu agencia.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <SettingsIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">Configuración</h2>
        <p className="text-gray-500">Aquí podrás editar el nombre de tu agencia, logos y datos de contacto próximamente.</p>
      </div>
    </div>
  );
}
