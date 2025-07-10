'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '@/store/appStore';

export function LoginNavbar() {
  const { t } = useTranslation('common');
  const { language, actions } = useAppStore();

  const handleLanguageChange = (newLanguage: 'en' | 'fr') => {
    actions.setLanguage(newLanguage);
  };

  const getCurrentLanguageLabel = () => {
    return language === 'en' ? 'ENGLISH' : 'FRANÇAIS';
  };

  return (
    <header className="relative z-20 flex items-center justify-between h-[52px] px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/icons/logo.svg"
          alt="Leadway Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold leading-tight text-gray-900">Leadway</span>
          <span className="text-xs leading-tight text-gray-600">Academy Admin</span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors"
          >
            {getCurrentLanguageLabel()}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[120px]">
          <DropdownMenuItem
            className="text-sm cursor-pointer"
            onClick={() => handleLanguageChange('en')}
          >
            {t('languages.english')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-sm cursor-pointer"
            onClick={() => handleLanguageChange('fr')}
          >
            {t('languages.french')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
