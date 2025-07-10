'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '@/store/appStore';
import '../../lib/i18n';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const { language, actions } = useAppStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync store with current i18n language on mount
  useEffect(() => {
    if (i18n.language !== language) {
      actions.setLanguage(i18n.language as 'en' | 'fr');
    }
    setIsInitialized(true);
  }, []);

  // Keep i18n in sync with store changes
  useEffect(() => {
    if (isInitialized && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n, isInitialized]);

  return <>{children}</>;
}
