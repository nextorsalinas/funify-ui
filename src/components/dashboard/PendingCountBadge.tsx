"use client";

import React, { useEffect, useState } from 'react';

export default function PendingCountBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.funifay.com';
      
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const token = getCookie('funifay_token');

      if (!token) return;

      try {
        const res = await fetch(`${apiUrl}/api/dashboard/orders/pending-count`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setCount(data.count || 0);
        }
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    }

    fetchCount();
  }, []);

  if (count === 0) return null;

  return (
    <span className="bg-[#FFDB00] text-[#001F5C] text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
      {count}
    </span>
  );
}
