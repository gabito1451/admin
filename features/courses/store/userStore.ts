import { create } from 'zustand';
import { Department, Learner, Specialization, User } from '../../../types';
import {
  mockDepartments,
  mockLearners,
  mockSpecializations,
  mockUsers,
} from '../../../utils/mockData';

interface UserState {
  users: User[];
  currentUser: User | null;
  learners: Learner[];
  departments: Department[];
  specializations: Specialization[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  fetchLearners: () => Promise<void>;
  fetchDepartments: () => Promise<void>;
  fetchSpecializations: () => Promise<void>;
  setCurrentUser: (user: User) => void;
  searchLearners: (query: string) => Learner[];
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  learners: [],
  departments: [],
  specializations: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use mock data
      set({ users: mockUsers, isLoading: false });

      // Set a default admin user if none exists

      if (!get().currentUser) {
        set({ currentUser: mockUsers.find((u) => u.role === 'admin') || null });
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      });
    }
  },

  fetchLearners: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Use mock data
      set({ learners: mockLearners, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch learners',
      });
    }
  },

  fetchDepartments: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Use mock data
      set({ departments: mockDepartments, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch departments',
      });
    }
  },

  fetchSpecializations: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Use mock data
      set({ specializations: mockSpecializations, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch specializations',
      });
    }
  },

  setCurrentUser: (user: User) => {
    set({ currentUser: user });
  },

  searchLearners: (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    return get().learners.filter(
      (learner) =>
        learner.name.toLowerCase().includes(lowercasedQuery) ||
        learner.email.toLowerCase().includes(lowercasedQuery) ||
        learner.department.toLowerCase().includes(lowercasedQuery) ||
        (learner.specialization && learner.specialization.toLowerCase().includes(lowercasedQuery))
    );
  },
}));
