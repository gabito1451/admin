import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../public/locales/en/common.json';
import frCommon from '../public/locales/fr/common.json';
import enCourses from '../public/locales/en/courses.json';
import frCourses from '../public/locales/fr/courses.json';

const resources = {
  en: {
    common: enCommon,
    courses: enCourses,
  },
  fr: {
    common: frCommon,
    courses: frCourses,
  },
};

// Get the stored language immediately during initialization
const getStoredLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';

  try {
    // Check both localStorage keys for compatibility
    const leadwayLang = localStorage.getItem('leadway-language');
    const appStorageLang = localStorage.getItem('app-storage');

    if (leadwayLang && ['en', 'fr'].includes(leadwayLang)) {
      return leadwayLang;
    }

    if (appStorageLang) {
      const parsed = JSON.parse(appStorageLang);
      if (parsed.state?.language && ['en', 'fr'].includes(parsed.state.language)) {
        return parsed.state.language;
      }
    }
  } catch (error) {
    console.warn('Error reading stored language:', error);
  }

  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
