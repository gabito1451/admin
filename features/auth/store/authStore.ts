import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../../types';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isHydrated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  setHydrated: () => void;
}

// Validation functions
const validateEmail = (email: string): boolean => {
  return email.endsWith('@leadway.com');
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isHydrated: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Validate email domain
          if (!validateEmail(email)) {
            set({
              error: 'Email must be from @leadway.com domain',
              isLoading: false,
            });
            return false;
          }

          // Validate password length
          if (!validatePassword(password)) {
            set({
              error: 'Password must be at least 8 characters long',
              isLoading: false,
            });
            return false;
          }

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock successful login for any valid @leadway.com email with 8+ char password
          const user: User = {
            id: 'user-' + Date.now(),
            email: email,
            name: email
              .split('@')[0]
              .replace('.', ' ')
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            role: 'admin',
            department: 'Administration',
          };

          set({
            user,
            token: 'mock-jwt-token-' + Date.now(),
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({
            error: 'An error occurred during login',
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      clearError: () => set({ error: null }),
      setHydrated: () => set({ isHydrated: true }), // Add this action
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Set hydrated to true when rehydration is complete
        state?.setHydrated();
      },
    }
  )
);
