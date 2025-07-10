'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, FileText, Users, GraduationCap, User, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'instructor' | 'learner' | 'page' | 'setting';
  url: string;
  category: string;
  metadata?: {
    status?: string;
    department?: string;
    rating?: number;
    enrolledCount?: number;
  };
}

// Mock search data - replace with actual API calls
const mockSearchData: SearchResult[] = [
  // Courses
  {
    id: 'course-1',
    title: 'Cybersecurity And Artificial Intelligence',
    description: 'Foundational Guide to Cybersecurity Architecture',
    type: 'course',
    url: '/dashboard/courses/course-1',
    category: 'Security',
    metadata: { status: 'pending', rating: 4.5, enrolledCount: 120 },
  },
  {
    id: 'course-2',
    title: 'Advanced React Development',
    description: 'Master modern React patterns and best practices',
    type: 'course',
    url: '/dashboard/courses/course-2',
    category: 'Development',
    metadata: { status: 'active', rating: 4.8, enrolledCount: 85 },
  },
  // Instructors
  {
    id: 'instructor-1',
    title: 'Segun Lawal',
    description: 'Senior Cybersecurity Expert',
    type: 'instructor',
    url: '/dashboard/instructors/instructor-1',
    category: 'Security',
    metadata: { department: 'IT Security' },
  },
  {
    id: 'instructor-2',
    title: 'Sarah Johnson',
    description: 'Full Stack Developer & React Specialist',
    type: 'instructor',
    url: '/dashboard/instructors/instructor-2',
    category: 'Development',
    metadata: { department: 'Engineering' },
  },
  // Learners
  {
    id: 'learner-1',
    title: 'John Doe',
    description: 'Software Engineer - Frontend Team',
    type: 'learner',
    url: '/dashboard/learners/learner-1',
    category: 'Engineering',
    metadata: { department: 'Engineering' },
  },
  // Pages
  {
    id: 'page-dashboard',
    title: 'Dashboard',
    description: 'Main dashboard overview',
    type: 'page',
    url: '/dashboard',
    category: 'Navigation',
  },
  {
    id: 'page-courses',
    title: 'Courses Management',
    description: 'Manage all courses and assignments',
    type: 'page',
    url: '/dashboard/courses',
    category: 'Navigation',
  },
  {
    id: 'page-instructors',
    title: 'Instructors Management',
    description: 'Manage instructors and invitations',
    type: 'page',
    url: '/dashboard/instructors',
    category: 'Navigation',
  },
  {
    id: 'page-learners',
    title: 'Learners Management',
    description: 'View and manage learner progress',
    type: 'page',
    url: '/dashboard/learners',
    category: 'Navigation',
  },
];

export const SearchInput = React.memo(function SearchInput({
  className,
  placeholder = 'Search dashboard',
}: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Memoize search function
  const performSearch = useCallback(async (query: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const filtered = mockSearchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    setIsLoading(false);
    return filtered;
  }, []);

  // Add this useEffect to trigger search when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        const searchResults = await performSearch(searchQuery);
        setResults(searchResults);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, performSearch]);

  // Memoize result click handler
  const handleResultClick = useCallback(
    (result: SearchResult) => {
      router.push(result.url);
      setIsOpen(false);
      setSearchQuery('');
      setSelectedIndex(-1);
      inputRef.current?.blur();
    },
    [router]
  );

  // Memoize clear search handler
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  }, []);

  // Memoize icon getter
  const getIcon = useCallback((type: SearchResult['type']) => {
    switch (type) {
      case 'course':
        return <GraduationCap className="h-4 w-4" />;
      case 'instructor':
        return <User className="h-4 w-4" />;
      case 'learner':
        return <Users className="h-4 w-4" />;
      case 'page':
        return <FileText className="h-4 w-4" />;
      case 'setting':
        return <Settings className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-orange-600 bg-orange-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-xs md:max-w-[384px] ${className}`}>
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          setIsFocused(true);
          if (searchQuery.trim() && results.length > 0) {
            setIsOpen(true);
          }
        }}
        onBlur={() => {
          setIsFocused(false);
          // Delay closing to allow clicks on results
          setTimeout(() => {
            if (!searchRef.current?.contains(document.activeElement)) {
              setIsOpen(false);
            }
          }, 150);
        }}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 h-10 border border-gray-300 rounded-lg bg-white shadow-sm text-sm leading-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
      />

      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full z-20"
        >
          <X className="h-3 w-3" />
        </Button>
      )}

      {/* Search Results Dropdown - Responsive positioning */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'none' }}>
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
            style={{
              top: searchRef.current
                ? searchRef.current.getBoundingClientRect().bottom + window.scrollY + 8
                : 0,
              left: searchRef.current
                ? Math.max(
                    8, // Minimum 8px from left edge
                    Math.min(
                      searchRef.current.getBoundingClientRect().left + window.scrollX,
                      window.innerWidth - (window.innerWidth < 640 ? window.innerWidth - 16 : 400) // Responsive width calculation
                    )
                  )
                : 0,
              width:
                window.innerWidth < 640
                  ? window.innerWidth - 16 // Full width minus 16px padding on mobile
                  : Math.max(searchRef.current?.offsetWidth || 300, 400), // Desktop: minimum 400px
              maxWidth: window.innerWidth < 640 ? window.innerWidth - 16 : '90vw', // Prevent overflow on any screen
              pointerEvents: 'auto',
              zIndex: 9999,
            }}
          >
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b">
                  Search Results ({results.length})
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleResultClick(result);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full px-3 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0',
                      selectedIndex === index && 'bg-orange-500/10'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-orange-500/10 text-orange-500">
                        {getIcon(result.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize flex-shrink-0">
                            {result.type}
                          </span>
                          {result.metadata?.status && (
                            <span
                              className={cn(
                                'text-xs px-2 py-1 rounded-full capitalize flex-shrink-0',
                                getStatusColor(result.metadata.status)
                              )}
                            >
                              {result.metadata.status}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 truncate mb-1">{result.description}</p>

                        <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                          <span>{result.category}</span>
                          {result.metadata?.rating && <span>★ {result.metadata.rating}</span>}
                          {result.metadata?.enrolledCount && (
                            <span>{result.metadata.enrolledCount} learners</span>
                          )}
                          {result.metadata?.department && <span>{result.metadata.department}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-4 text-center">
                <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try searching for courses, instructors, or learners
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
});
