import React from "react";
export const dynamic = 'force-dynamic';

import HeroBanner from "@/components/marketplace/HeroBanner";
import CategoryPills from "@/components/marketplace/CategoryPills";
import Features from "@/components/marketplace/Features";
import GridShowcase from "@/components/marketplace/GridShowcase";
import SupplierBanner from "@/components/marketplace/SupplierBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col overflow-x-hidden">
      {/* 1. Hero & Search */}
      <HeroBanner />
      
      {/* 2. Fast Navigation Categories (Sticky) */}
      <CategoryPills />
      
      <div className="flex-grow flex flex-col">
        {/* 3. Why Funifay? (Trust & Benefits) */}
        <Features />
        
        {/* 4. The Catalog (Product Grid) */}
        <section className="bg-white py-12 rounded-t-[4rem] shadow-[0_-20px_60px_-15px_rgba(0,31,92,0.05)] -mt-16 z-20">
           <GridShowcase />
        </section>

        {/* 5. Become a Supplier */}
        <SupplierBanner />
      </div>

      {/*  Footer logic is usually in layout.tsx, but the main content ends here */}
    </main>
  );
}
