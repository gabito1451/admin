'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, LayoutDashboard, BookOpen, Users, GraduationCap, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useUserStore } from '@/features/courses/store/userStore';
import { useAuthStore } from '@/features/auth/store/authStore';
import useAppStore from '@/store/appStore';
import { SearchInput } from './ui/SearchInput';
import { NotificationDropdown } from './ui/NotificationDropdown';
import { ProfileDropdown } from './ui/ProfileDropdown';
import { useTranslation } from 'react-i18next';
import '@/styles/layout/navbar.css';
// import { useLoading } from '@/components/providers/LoadingProvider';

interface NavbarProps {
  user?: {
    id: string;
    email: string;
    name: string;
    role: 'admin';
    avatar?: string;
    department?: string;
  };
}

export function Navbar({ user: propUser }: NavbarProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user data from store
  const { fetchUsers, currentUser } = useUserStore();
  const { logout: authLogout } = useAuthStore();
  const { actions } = useAppStore();
  // const { setLoading } = useLoading();
  // Initialize user data on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Use currentUser from store if available, otherwise fall back to prop or default
  const user = currentUser ||
    propUser || {
      name: 'Essa Von',
      role: 'admin',
      avatar: '/assets/icons/placeholder.svg?height=40&width=40',
      id: 'admin-1',
      email: 'admin@leadway-group.com',
      department: 'HR',
    };

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileLogout = async () => {
    // Show loading immediately
    // setLoading(true);

    // Clear both stores
    actions.logout();
    authLogout();
    closeMobileMenu();

    // Small delay to ensure stores are cleared before redirect
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Navigate to login
    router.push('/auth/login');
  };

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="navbar__logo">
        <Link href="/dashboard" className="navbar__logo-link">
          <Image
            src="/assets/icons/logo.svg"
            alt="Leadway Logo"
            width={32}
            height={32}
            className="navbar__logo-image"
          />
          <div className="navbar__logo-text">
            <span className="navbar__logo-title text-sm sm:text-base">Leadway</span>
            <span className="navbar__logo-subtitle text-xs">{t('login.title')}</span>
          </div>
        </Link>
      </div>

      {/* Desktop Search Bar */}
      {isDesktop && (
        <div className="navbar__search-container">
          <SearchInput className="w-full max-w-md" placeholder={t('common.search')} />
        </div>
      )}

      {/* Desktop Right Section */}
      {isDesktop && (
        <div className="navbar__desktop-right">
          <NotificationDropdown />
          <ProfileDropdown user={user} />
        </div>
      )}

      {/* Mobile Menu Trigger */}
      {!isDesktop && (
        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="navbar__mobile-trigger p-2">
                <Menu className="h-6 w-6 text-[#ff9500]" />
                <span className="sr-only">{t('navbar.openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="navbar__mobile-menu w-80 bg-white border-l border-gray-200 p-0 flex flex-col h-full"
            >
              {/* Add SheetHeader with SheetTitle for accessibility */}
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile Navigation Menu</SheetTitle>
              </SheetHeader>

              {/* Custom Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                    {/* <span className="sr-only">Close</span> */}
                  </Button>
                </SheetClose>
              </div>

              {/* User Profile Header - Fixed height */}
              <div className="bg-gradient-to-r from-[#ff9500] to-[#ff7b00] p-4 text-white pr-16 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={user.avatar || '/placeholder.svg'}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white/20"
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{user.name}</h3>
                    <p className="text-white/80 text-sm">{user.email}</p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {user.role} • {user.department}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar - Fixed height */}
              <div className="p-3 border-b border-gray-100 flex-shrink-0">
                <SearchInput placeholder={t('common.search')} className="w-full h-9" />
              </div>

              {/* Navigation Menu - Flexible height */}
              <div className="flex-1 py-2 overflow-y-auto">
                <nav className="space-y-0.5 px-3">
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#ff9500]/10 group-hover:bg-[#ff9500]/20 transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-[#ff9500]" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-[#ff9500] transition-colors text-sm">
                      {t('navigation.dashboard')}
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/courses"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#ff9500]/10 group-hover:bg-[#ff9500]/20 transition-colors">
                      <BookOpen className="h-4 w-4 text-[#ff9500]" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-[#ff9500] transition-colors text-sm">
                      {t('navigation.courses')}
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/learners"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#ff9500]/10 group-hover:bg-[#ff9500]/20 transition-colors">
                      <Users className="h-4 w-4 text-[#ff9500]" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-[#ff9500] transition-colors text-sm">
                      {t('navigation.learners')}
                    </span>
                  </Link>

                  <Link
                    href="/dashboard/instructors"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-[#ff9500]/10 group-hover:bg-[#ff9500]/20 transition-colors">
                      <GraduationCap className="h-4 w-4 text-[#ff9500]" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-[#ff9500] transition-colors text-sm">
                      {t('navigation.instructors')}
                    </span>
                  </Link>
                </nav>
              </div>

              {/* Logout Button - Fixed at bottom */}
              <div className="border-t border-gray-100 p-3 flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={handleMobileLogout}
                  className="w-full justify-start gap-3 px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors h-auto"
                >
                  <div className="p-1.5 rounded-lg bg-red-50">
                    <LogOut className="h-4 w-4 text-red-500" />
                  </div>
                  <span className="font-medium text-sm">{t('navigation.logout')}</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </header>
  );
}
