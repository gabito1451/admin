'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown } from 'lucide-react';
export function FilterDropdown() {
  const [selected, setSelected] = React.useState('Course Count');
  const options = ['Show All', 'Course Count'];

  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger className="border border-[#d9d9dc] outline-none mt-4 h-[37px]" asChild>
          <button className="inline-flex items-center justify-between rounded-md border px-2 py-1 text-[#000000] text-[14px] font-normal shadow-sm hover:bg-muted text-nowrap sm:px-3 sm:py-2 ">
            Filter: {selected}
            <ChevronDown className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col justify-start w-36 text-nowrap p-1">
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() => setSelected(option)}
              className={`flex items-center justify-between px-2 py-2 text-sm rounded-md cursor-pointer ${
                selected === option
                  ? 'bg-leadway-orange-light text-academy-orange'
                  : 'text-muted-foreground'
              }`}
            >
              {option}
              {selected === option ? (
                <div className="h-4 w-4 bg-academy-orange rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <div className="h-4 w-4 border border-muted-foreground rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
