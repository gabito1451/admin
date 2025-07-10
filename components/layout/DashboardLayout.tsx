import React, { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-white  ">
      <Sidebar className="block" />
      <div className="flex w-full flex-1 flex-col ">
        <Navbar />
        <main className="w-full ">{children}</main>
      </div>
    </div>
  );
}
