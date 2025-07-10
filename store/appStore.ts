import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

type Language = 'en' | 'fr';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark' | 'system';
  language: Language;
  actions: {
    setUser: (user: User | null) => void;
    setTheme: (theme: AppState['theme']) => void;
    setLanguage: (language: Language) => void;
    logout: () => void;
  };
}

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      theme: 'system',
      language: 'en',
      actions: {
        setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
        setTheme: (theme: AppState['theme']) => set({ theme }),
        setLanguage: (language: Language) => {
          set({ language });
          // Immediately update localStorage and i18n
          if (typeof window !== 'undefined') {
            localStorage.setItem('leadway-language', language);
          }
        },
        logout: () => set({ user: null, isAuthenticated: false }),
      },
    }),
    {
      name: 'app-storage',
      partialize: (state: AppState) => ({
        user: state.user,
        theme: state.theme,
        language: state.language,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAppStore;
