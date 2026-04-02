"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, PartyPopper } from 'lucide-react';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok && data.success && data.access_token) {
        document.cookie = `funifay_token=${data.access_token}; path=/; max-age=604800`; // 7 days
        localStorage.setItem('funifay_user', JSON.stringify(data.user));
        localStorage.setItem('funifay_agency', JSON.stringify(data.agency));
        router.push('/dashboard');
      } else {
        setError(data.message || data.errors?.email?.[0] || 'Credenciales incorrectas.');
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
        <div className="mx-auto h-16 w-16 bg-[#001F5C] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 mb-6">
          <PartyPopper className="w-8 h-8 text-[#FFDB00]" />
        </div>
        <h2 className="text-4xl font-black text-[#001F5C] tracking-tight">
          Funifay <span className="text-[#FFDB00]">Negocios</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">
          Accede a tu panel y gestiona tus reservas.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-gray-100 hover:shadow-md transition-shadow">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-semibold text-center border border-red-100 animate-in fade-in zoom-in duration-200">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required autoFocus type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#FFDB00] focus:border-[#FFDB00] sm:text-sm transition-colors" placeholder="correo@agencia.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-[#FFDB00] focus:border-[#FFDB00] sm:text-sm transition-colors" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#001F5C] focus:ring-[#FFDB00] border-gray-300 rounded cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer font-medium hover:text-[#001F5C] transition-colors">Recordarme</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#001F5C] hover:text-[#001F5C]/80 transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
            </div>

            <div>
              <button disabled={loading} type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-[#001F5C] bg-[#FFDB00] hover:bg-[#e6c600] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDB00] transition-colors disabled:opacity-70 mt-4 group">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                  <>
                    Entrar al Panel <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
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
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-medium">¿Aún no vendes en Funifay?</span>
            </div>
            <div className="mt-4 text-center pb-2">
              <Link href="/auth/register" className="font-bold text-gray-500 hover:text-gray-900 inline-flex items-center transition-colors">
                Regístrate como proveedor 
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
