import React from "react";
import Header from "@/components/layout/Header";
import TopAnnouncement from "@/components/marketplace/TopAnnouncement";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopAnnouncement />
      <Header />
      <div className="flex-grow pt-[64px] md:pt-0">
        {children}
      </div>
    </div>
  );
}
