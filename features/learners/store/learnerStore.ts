import { create } from 'zustand';
import { Learner } from '../../../lib/data/learners'; // Use the correct Learner type
import { learners as mockLearners } from '../../../lib/data/learners';

interface LearnerState {
  learners: Learner[];
  filteredLearners: Learner[];
  selectedLearner: Learner | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  // Actions
  fetchLearners: () => Promise<void>;
  getLearnerById: (id: string) => Learner | undefined;
  searchLearners: (query: string) => void;
  setSelectedLearner: (learner: Learner | null) => void;
  updateLearner: (id: string, updates: Partial<Learner>) => Promise<void>;
  clearError: () => void;
  resetFilters: () => void;
}

// Mock API functions (replace with real API calls)
const fetchLearnersApi = async (): Promise<Learner[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Remove the random error simulation for better UX
  // if (Math.random() < 0.1) {
  //   throw new Error('Failed to fetch learners from server');
  // }

  return mockLearners;
};

const updateLearnerApi = async (id: string, updates: Partial<Learner>): Promise<Learner> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const learner = mockLearners.find((l) => l.id === id);
  if (!learner) {
    throw new Error(`Learner with ID "${id}" not found`);
  }

  return { ...learner, ...updates };
};

export const useLearnerStore = create<LearnerState>((set, get) => ({
  learners: [],
  filteredLearners: [],
  selectedLearner: null,
  isLoading: false,
  error: null,
  searchQuery: '',

  fetchLearners: async () => {
    set({ isLoading: true, error: null });

    try {
      const learners = await fetchLearnersApi();
      set({
        learners,
        filteredLearners: learners,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch learners',
      });
    }
  },

  getLearnerById: (id: string) => {
    return get().learners.find((learner) => learner.id === id);
  },

  searchLearners: (query: string) => {
    const { learners } = get();
    set({ searchQuery: query });

    if (!query.trim()) {
      set({ filteredLearners: learners });
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = learners.filter(
      (learner) =>
        learner.name.toLowerCase().includes(lowercasedQuery) ||
        learner.email.toLowerCase().includes(lowercasedQuery) ||
        learner.title.toLowerCase().includes(lowercasedQuery)
    );

    set({ filteredLearners: filtered });
  },

  setSelectedLearner: (learner: Learner | null) => {
    set({ selectedLearner: learner });
  },

  updateLearner: async (id: string, updates: Partial<Learner>) => {
    set({ isLoading: true, error: null });

    try {
      const updatedLearner = await updateLearnerApi(id, updates);
      const { learners } = get();

      const updatedLearners = learners.map((learner) =>
        learner.id === id ? updatedLearner : learner
      );

      set({
        learners: updatedLearners,
        filteredLearners: updatedLearners,
        selectedLearner: updatedLearner,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update learner',
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  resetFilters: () => {
    const { learners } = get();
    set({
      filteredLearners: learners,
      searchQuery: '',
      selectedLearner: null,
    });
  },
}));
