import { create } from 'zustand';
import { Learner } from '@/components/learners/types/learner';

interface LearnerState {
  learners: Learner[];
  setLearners: (data: Learner[]) => void;
}

export const useLearnerStore = create<LearnerState>((set) => ({
  learners: [],
  setLearners: (data) => set({ learners: data }),
}));
