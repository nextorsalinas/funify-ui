"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');
    const agencyData = searchParams.get('agency');

    if (token && userData) {
      // Función para decodificar urlencode de PHP (maneja + como espacios)
      const phpDecode = (str: string) => decodeURIComponent(str.replace(/\+/g, ' '));

      // Guardar el Token en Cookies (para el middleware)
      document.cookie = `funifay_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      
      // Guardar datos del usuario
      localStorage.setItem('funifay_user', phpDecode(userData));

      if (agencyData && agencyData !== 'null') {
        // Tiene agencia -> Dashboard
        localStorage.setItem('funifay_agency', phpDecode(agencyData));
        router.push('/dashboard');
      } else {
        // NO tiene agencia -> Completar Perfil
        router.push('/auth/complete-profile');
      }
    } else {
      // Si falta algo esencial, volver al login
      router.push('/auth/login?error=social_auth_failed');
    }
  }, [searchParams, router]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center max-w-sm w-full">
      <Loader2 className="w-12 h-12 text-[#FFDB00] animate-spin mb-6" />
      <h1 className="text-2xl font-bold text-[#001F5C] mb-2">Autenticando...</h1>
      <p className="text-gray-500">Estamos verificando tu cuenta de Google. Pronto estarás en tu panel.</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center max-w-sm w-full">
          <Loader2 className="w-12 h-12 text-[#FFDB00] animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-[#001F5C] mb-2">Cargando...</h1>
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
