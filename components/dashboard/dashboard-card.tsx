'use client';

import React from 'react';
import Image from 'next/image';
import DashboardBg from './dashboard-bg';

interface DashboardCardProps {
  label: string;
  count: number;
  iconSrc: string;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  label,
  count,
  iconSrc,

  className,
}) => (
  <div className="relative rounded-xl p-4 text-white w-full md:max-w-[278px] flex justify-center items-center overflow-hidden transition-transform duration-300 ease-in-out hover:animate-bounceHover animate-fade-slide-in">
    <div className="absolute inset-0 z-0 w-full">
      <DashboardBg />
    </div>

    <div className="z-10 relative mr-4 flex flex-row justify-center items-center gap-10 md:gap-4">
      <div className="rounded-full flex-shrink-0 p-2 bg-orange-400">
        <Image src={iconSrc} alt="icon" width={36} height={36} className={className} />
      </div>
      <div>
        <p className="text-[14px] font-product-sans font-normal mt-2">{label}</p>
        <h2 className="text-[28px] font-product-sans font-bold">{count}</h2>
      </div>
    </div>
  </div>
);
