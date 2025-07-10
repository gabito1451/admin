'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, User, Settings, Bell, HelpCircle, Shield, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User as UserType } from '@/types';
import { useTranslation } from 'react-i18next';
import useAppStore from '@/store/appStore';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useLoading } from '@/components/providers/LoadingProvider';

interface ProfileDropdownProps {
  user: UserType;
  className?: string;
}

export function ProfileDropdown({ user, className }: ProfileDropdownProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { actions } = useAppStore();
  const { logout: authLogout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Inside the component:
  const { setLoading } = useLoading();

  const handleLogout = async () => {
    // Show loading immediately
    setLoading(true);

    // Clear both stores
    actions.logout();
    authLogout();

    // Small delay to ensure stores are cleared before redirect
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Navigate to login
    router.push('/auth/login');
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="outline-none">
        <Button
          variant="ghost"
          className={`navbar__profile-trigger ${className} focus:outline-none focus:ring-0 focus:border-0 hover:bg-transparent border-0 transition-none`}
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
        >
          <Avatar className="navbar__profile-avatar">
            <AvatarImage
              src={user.avatar || '/placeholder.svg'}
              alt={user.name}
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
            {!imageLoaded && (
              <AvatarFallback className="navbar__profile-avatar-fallback h-6 w-6 sm:h-7 sm:w-7 bg-gray-200 text-gray-600 text-xs font-medium">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="navbar__profile-info">
            <span className="navbar__profile-name">{user.name}</span>
            <span className="navbar__profile-role">{user.role}</span>
          </div>
          <ChevronDown
            className={`navbar__profile-chevron transition-transform duration-200 h-5 w-5 stroke-2 text-gray-700 ${isOpen ? 'navbar__profile-chevron--open rotate-180' : ''}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="navbar__profile-dropdown min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-0 mt-2"
        sideOffset={8}
      >
        {/* User Profile Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user.avatar || '/placeholder.svg'}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <AvatarFallback className="h-12 w-12 bg-gray-200 text-gray-600 text-lg font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold text-gray-900 truncate">{user.name}</div>
              <div className="text-sm text-gray-500 capitalize truncate">{user.role}</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem className="navbar__profile-menu-item mx-2 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-3">
            <User className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {t('navbar.profileSettings')}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="navbar__profile-menu-item mx-2 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-3">
            <Settings className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {t('navbar.accountSettings')}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="navbar__profile-menu-item mx-2 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {t('navbar.notificationPreferences')}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="navbar__profile-menu-item mx-2 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {t('navbar.privacy')}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem className="navbar__profile-menu-item mx-2 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {t('navbar.helpSupport')}
            </span>
          </DropdownMenuItem>
        </div>

        {/* Separator */}
        <DropdownMenuSeparator className="my-2 bg-gray-200" />

        {/* Logout */}
        <div className="py-2">
          <DropdownMenuItem
            className="navbar__profile-logout cursor-pointer mx-2 rounded-lg px-3 py-3 hover:bg-red-50 transition-colors duration-150 group flex items-center gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 text-red-500 group-hover:text-red-600 flex-shrink-0" />
            <span className="text-sm font-medium text-red-600 group-hover:text-red-700 whitespace-nowrap">
              {t('navigation.logout')}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
