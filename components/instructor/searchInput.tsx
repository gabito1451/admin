'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useInstructorStore } from '@/features/instructor/store/instructor-store';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onInstructorSelect?: (instructorId: number) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search instructor...',
  value,
  onChange,
  className = '',
  onInstructorSelect,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { filteredUsers, searchInstructors } = useInstructorStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    searchInstructors(e.target.value);
    setIsSearchOpen(e.target.value.trim().length > 0);
    setSelectedIndex(-1);
  };

  const handleInstructorClick = (instructorId: number) => {
    if (onInstructorSelect) {
      onInstructorSelect(instructorId);
    } else {
      window.location.href = `/dashboard/instructors/${instructorId}`;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen || filteredUsers.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredUsers.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleInstructorClick(Number(filteredUsers[selectedIndex].id));
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredUsers, selectedIndex, isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative max-w-[384px] md:w-[384px] pb-4 ${className}`}>
      <Image
        src="/assets/icons/search.svg"
        alt="search icon"
        width={10}
        height={10}
        className="absolute left-3 top-[18px] sm:top-[20px] -translate-y-[40%] md:-translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground pointer-events-none"
      />
      <Input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-10 outline-none h-[38px] sm:h-10 py-0 placeholder:text-ash-1 placeholder:text-[14px] placeholder:font-normal shadow-sm text-sm leading-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
      />

      {isSearchOpen && value.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[300px] overflow-y-auto z-[100]">
          {filteredUsers.length > 0 ? (
            <div className="py-2 z-50">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                Search Results ({filteredUsers.length})
              </div>
              {filteredUsers.slice(0, 10).map((instructor, index) => (
                <button
                  key={instructor.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleInstructorClick(instructor.id);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0',
                    selectedIndex === index && 'bg-orange-500/10'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-orange-600">
                        {instructor.firstname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {instructor.firstname} {instructor.lastname}
                        </h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          Instructor
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-1">{instructor.email}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{instructor.department}</span>
                        <span>{instructor.registeredOn}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No instructors found for "{value}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchInput;
