"use client";

import React, { useEffect, useState } from 'react';

export default function UserProfile() {
  const [userName, setUserName] = useState('Emprendedor');
  const [userEmail, setUserEmail] = useState('admin@funifay.com');
  const [agencyName, setAgencyName] = useState('Mi Agencia');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('funifay_user');
      const savedAgency = localStorage.getItem('funifay_agency');

      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.name) setUserName(user.name);
        if (user.email) setUserEmail(user.email);
        if (user.avatar) setUserAvatar(user.avatar);
      }

      if (savedAgency) {
        const agency = JSON.parse(savedAgency);
        if (agency.name) setAgencyName(agency.name);
      }
    } catch (e) {
      console.error("Error loading user info from localStorage", e);
    }
  }, []);

  return (
    <div className="flex items-center mb-4 px-2">
      {userAvatar ? (
        <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner shrink-0 object-cover" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-[#FFDB00] shadow-inner uppercase shrink-0">
          {userName.charAt(0)}
        </div>
      )}
      <div className="ml-3 min-w-0">
        <p className="text-sm font-bold text-white truncate capitalize">{agencyName}</p>
        <p className="text-xs text-white/60 truncate">{userEmail}</p>
      </div>
    </div>
  );
}
