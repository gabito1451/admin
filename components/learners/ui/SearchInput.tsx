'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { learners } from '@/lib/data/learners';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onLearnerSelect?: (learnerId: string) => void;
  className?: string;
}

export function SearchInput({
  searchTerm,
  onSearchChange,
  onLearnerSelect,
  className,
}: SearchInputProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter learners based on search term
  const filteredLearners = learners.filter((learner) => {
    const searchLower = searchTerm.toLowerCase();

    // Search in main learner properties
    const mainPropertiesMatch =
      learner.name.toLowerCase().includes(searchLower) ||
      learner.email.toLowerCase().includes(searchLower) ||
      learner.department?.toLowerCase().includes(searchLower) ||
      learner.role?.toLowerCase().includes(searchLower) ||
      learner.title.toLowerCase().includes(searchLower);

    // Search in ongoing courses
    const ongoingCoursesMatch = learner.ongoingCourses.some(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
    );

    // Search in completed courses
    const completedCoursesMatch = learner.completedCourses.some(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.grade.toLowerCase().includes(searchLower)
    );

    return mainPropertiesMatch || ongoingCoursesMatch || completedCoursesMatch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setIsSearchOpen(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen || filteredLearners.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filteredLearners.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < filteredLearners.length) {
            handleLearnerClick(filteredLearners[selectedIndex].id);
          }
          break;
        case 'Escape':
          setIsSearchOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, filteredLearners, selectedIndex]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    onSearchChange('');
    setIsSearchOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleLearnerClick = (learnerId: string) => {
    if (onLearnerSelect) {
      onLearnerSelect(learnerId);
    } else {
      window.location.href = `/dashboard/learners/${learnerId}`;
    }
    setIsSearchOpen(false);
    onSearchChange('');
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className={cn('relative w-full max-w-xs', className)}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search learners..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => {
          if (searchTerm.trim() && filteredLearners.length > 0) {
            setIsSearchOpen(true);
          }
        }}
        className="w-full pl-10 pr-10 py-2 h-10 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 hover:border-gray-400 placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />

      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full z-20 flex items-center justify-center"
        >
          <X className="h-3 w-3 text-gray-400" />
        </button>
      )}

      {/* Search Results Dropdown */}
      {isSearchOpen && searchTerm.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {filteredLearners.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                Search Results ({filteredLearners.length})
              </div>
              {filteredLearners.slice(0, 10).map((learner, index) => (
                <button
                  key={learner.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleLearnerClick(learner.id);
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
                        {learner.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {learner.name}
                        </h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          Learner
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mb-1">{learner.email}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {learner.department && <span>{learner.department}</span>}
                        {learner.role && <span>{learner.role}</span>}
                        <span>{learner.assignedCourses} courses</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filteredLearners.length > 10 && (
                <div className="px-3 py-2 text-xs text-gray-500 text-center border-t">
                  Showing first 10 of {filteredLearners.length} results
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center">
              <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No learners found for "{searchTerm}"</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching by name, email, department, or role
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
