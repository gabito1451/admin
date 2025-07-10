'use client';

import type React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();

  // Use exact pixel values that match CSS
  const sidebarWidth = isMobile ? 0 : 112; // Hide sidebar on mobile
  const navbarHeight = 77; // Updated to match new navbar height

  return (
    <div className="relative min-h-screen w-full bg-gray-50" style={{ margin: 0, padding: 0 }}>
      <Navbar />
      {/* Only render Sidebar on non-mobile screens */}
      {!isMobile && <Sidebar />}
      <div
        style={{
          position: 'fixed',
          top: `${navbarHeight}px`,
          left: `${sidebarWidth}px`,
          right: 0,
          bottom: 0,
          width: `calc(100vw - ${sidebarWidth}px)`,
          height: `calc(100vh - ${navbarHeight}px)`,
          overflow: 'auto',
          margin: 0,
          padding: 0,
          backgroundColor: '#f9fafb',
        }}
      >
        <main
          style={{
            width: '100%',
            // height: '100%',
            padding: '1rem 1.5rem 1.75rem',
            margin: 0,
            minHeight: '100vh',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
