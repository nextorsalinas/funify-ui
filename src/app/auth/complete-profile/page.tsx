"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building, ArrowRight, Loader2, PartyPopper } from 'lucide-react';

export default function CompleteProfilePage() {
  const router = useRouter();
  const [agencyName, setAgencyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('funifay_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.name);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const token = getCookie('funifay_token');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/api/auth/complete-profile`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ agency_name: agencyName })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('funifay_agency', JSON.stringify(data.agency));
        router.push('/dashboard');
      } else {
        setError(data.error || 'No se pudo guardar el nombre de la agencia.');
      }
    } catch (err) {
      setError('Problema de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-16 w-16 bg-[#001F5C] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 mb-6">
          <PartyPopper className="w-8 h-8 text-[#FFDB00]" />
        </div>
        <h2 className="text-3xl font-black text-[#001F5C] tracking-tight">
          ¡Bienvenido, {userName.split(' ')[0]}!
        </h2>
        <p className="mt-2 text-gray-500 font-medium">
          Solo un último paso para activar tu cuenta.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-2xl rounded-3xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-semibold text-center border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-[#001F5C] mb-2 uppercase tracking-wide">
                ¿Cómo se llama tu Agencia o Negocio?
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Building className="h-5 w-5 text-gray-400 group-focus-within:text-[#FFDB00] transition-colors" />
                </div>
                <input 
                  required 
                  autoFocus 
                  type="text" 
                  value={agencyName} 
                  onChange={e => setAgencyName(e.target.value)} 
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#FFDB00] transition-all text-lg font-medium" 
                  placeholder="Ej. Diversiones Inflables" 
                />
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Este nombre será el que verán tus clientes en el Marketplace de Funifay.
              </p>
            </div>

            <button 
              disabled={loading || !agencyName} 
              type="submit" 
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-xl text-lg font-black text-[#001F5C] bg-[#FFDB00] hover:bg-[#e6c600] focus:outline-none focus:ring-4 focus:ring-[#FFDB00]/50 transition-all disabled:opacity-50 group hover:shadow-2xl active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                <>
                  Comenzar ahora <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
