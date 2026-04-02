"use client";

import React from 'react';

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    // Redirigir al endpoint de Laravel que inicia el flujo de Google
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    window.location.href = `${apiUrl}/api/auth/google/redirect`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
    >
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
      <span>Continuar con Google</span>
    </button>
  );
}
