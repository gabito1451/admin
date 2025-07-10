import { create } from 'zustand';

interface PendingCourse {
  id: string;
  title: string;
  category: string;
  submittedOn: string;
  instructor: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

interface PendingCoursesState {
  pendingCourses: PendingCourse[];
  rejectedCourses: PendingCourse[];
  isLoading: boolean;

  fetchPendingCourses: () => Promise<void>;
  approveCourse: (courseId: string) => void;
  rejectCourse: (courseId: string, reason: string) => void;
}

export const usePendingCoursesStore = create<PendingCoursesState>((set, get) => ({
  // ... implementation
}));
