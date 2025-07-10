'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import Loader from '@/components/layout/Loader';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [isNewTabLoading, setIsNewTabLoading] = useState(false);
  const [isManualLoading, setIsManualLoading] = useState(false); // Add this

  const { isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();

  const setLoading = (loading: boolean) => {
    if (loading) {
      setIsLoading(true);
      setIsManualLoading(true); // Mark as manual loading
      setIsVisible(true);
      setOpacity(1);
    } else {
      // Smooth fade out
      setOpacity(0);
      setTimeout(() => {
        setIsLoading(false);
        setIsManualLoading(false); // Reset manual loading
        setIsVisible(false);
      }, 300);
    }
  };

  // Handle new tab/window detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isManualLoading) return; // Don't interfere with manual loading

      if (document.visibilityState === 'hidden') {
        // User might be opening a new tab
        setIsNewTabLoading(true);
        setIsVisible(true);
        setOpacity(1);
      } else if (document.visibilityState === 'visible') {
        // User returned to this tab
        if (isNewTabLoading) {
          setTimeout(() => {
            setOpacity(0);
            setTimeout(() => {
              setIsNewTabLoading(false);
              setIsVisible(false);
            }, 300);
          }, 100);
        }
      }
    };

    const handleBeforeUnload = () => {
      if (isManualLoading) return; // Don't interfere with manual loading

      // Show loader when navigating away
      setIsNewTabLoading(true);
      setIsVisible(true);
      setOpacity(1);
    };

    const handleFocus = () => {
      if (isManualLoading) return; // Don't interfere with manual loading

      // Hide loader when window gets focus (user returned)
      if (isNewTabLoading && !isLoading && !isInitialLoading) {
        setTimeout(() => {
          setOpacity(0);
          setTimeout(() => {
            setIsNewTabLoading(false);
            setIsVisible(false);
          }, 300);
        }, 100);
      }
    };

    const handleBlur = () => {
      if (isManualLoading) return; // Don't interfere with manual loading

      // Show loader when window loses focus (might be opening new tab)
      if (!isLoading && !isInitialLoading) {
        setIsNewTabLoading(true);
        setIsVisible(true);
        setOpacity(1);
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Intercept link clicks to detect new tab opens
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const isNewTab = event.ctrlKey || event.metaKey || link.target === '_blank';
        const isExternalLink = link.href && !link.href.startsWith(window.location.origin);

        if (isNewTab || isExternalLink) {
          setIsNewTabLoading(true);
          setIsVisible(true);
          setOpacity(1);

          // Auto-hide after a reasonable time if user doesn't return
          setTimeout(() => {
            if (isNewTabLoading) {
              setOpacity(0);
              setTimeout(() => {
                setIsNewTabLoading(false);
                setIsVisible(false);
              }, 300);
            }
          }, 2000);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [isNewTabLoading, isLoading, isInitialLoading, isManualLoading]); // Add isManualLoading to dependencies

  // Handle initial loading state
  useEffect(() => {
    if (isHydrated) {
      // Wait for content to be ready
      const timer = setTimeout(() => {
        if (!isLoading && !isNewTabLoading) {
          setOpacity(0);
          setTimeout(() => {
            setIsInitialLoading(false);
            setIsVisible(false);
          }, 300);
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isHydrated, isLoading, isNewTabLoading]);

  // Reset on auth changes
  useEffect(() => {
    if (!isAuthenticated && isHydrated) {
      setIsInitialLoading(false);
      setIsNewTabLoading(false);
      setIsVisible(false);
      setOpacity(0);
    }
  }, [isAuthenticated, isHydrated]);

  // Show loader when manual loading, initial loading, or new tab loading
  const shouldShowLoader = (isLoading || isInitialLoading || isNewTabLoading) && isVisible;

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {/* {shouldShowLoader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          style={{
            opacity,
            transition: 'opacity 300ms ease-in-out',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
          }}
        >
          <div
            style={{
              transform: `scale(${opacity === 0 ? 0.95 : 1})`,
              transition: 'transform 300ms ease-in-out',
            }}
          >
            <Loader variant="overlay" size="lg" />
          </div>
        </div>
      )} */}
    </LoadingContext.Provider>
  );
};
