"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Building, ArrowRight, Loader2 } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    owner_name: '',
    email: '',
    password: '',
    agency_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success && data.access_token) {
        document.cookie = `funifay_token=${data.access_token}; path=/; max-age=604800`; // 7 days
        localStorage.setItem('funifay_user', JSON.stringify(data.user));
        localStorage.setItem('funifay_agency', JSON.stringify(data.agency));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Error al crear la cuenta. Intenta con otro correo.');
      }
    } catch (err) {
      setError('Problema de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-4xl font-black text-[#001F5C] tracking-tight">
          Funifay <span className="text-[#FFDB00]">Negocios</span>
        </h2>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Registra tu Agencia
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-semibold text-center border border-red-100 flex items-center justify-center animate-in fade-in zoom-in duration-200">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Propietario</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required autoFocus type="text" value={formData.owner_name} onChange={e => setFormData({...formData, owner_name: e.target.value})} className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#FFDB00] focus:border-[#FFDB00] sm:text-sm" placeholder="Ej. Ana Sánchez" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de tu Agencia/Negocio</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required type="text" value={formData.agency_name} onChange={e => setFormData({...formData, agency_name: e.target.value})} className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#FFDB00] focus:border-[#FFDB00] sm:text-sm" placeholder="Ej. Diversiones Felices" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#FFDB00] focus:border-[#FFDB00] sm:text-sm" placeholder="correo@ejemplo.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña (Mín. 8 caracteres)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required minLength={8} type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#FFDB00] focus:border-[#FFDB00] sm:text-sm" placeholder="••••••••" />
              </div>
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#001F5C] hover:bg-[#001540] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001F5C] transition-colors disabled:opacity-70 mt-2">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Crear Cuenta Segura'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-400 font-medium tracking-wide uppercase">o continuar con</span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleLoginButton />
            </div>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">¿Ya eres socio?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/auth/login" className="font-bold text-[#001F5C] hover:text-[#001F5C]/80 inline-flex items-center transition-colors">
                Inicia sesión aquí <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
