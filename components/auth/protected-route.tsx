'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import Loader from '@/components/layout/Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (isHydrated && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Wait for hydration to complete before making auth decisions
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader variant="default" size="lg" />
      </div>
    );
  }

  // If not authenticated after hydration, show loading while redirecting
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader variant="default" size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
