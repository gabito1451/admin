'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (isHydrated) {
      if (isAuthenticated) {
        router.replace('/dashboard'); // Use replace instead of push for faster navigation
      } else {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, isHydrated, router]);

  // Return minimal loading state
  return null;
}
