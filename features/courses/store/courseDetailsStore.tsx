import { create } from 'zustand';
import {
  fetchCourseById,
  fetchCourseChangeLog,
  fetchCourseStats,
} from '@/features/courses/services/course-service';
import { Course } from '@/types';

interface CourseDetailsState {
  course: Course | null;
  stats: any | null;
  changeLog: any[] | null;
  isLoading: boolean;
  error: string | null;

  // Derived state that will be calculated
  totalEnrolled: number;
  totalCompleted: number;
  totalHours: string | number;
  totalLessons: string | number;
  level: string;

  fetchCourseData: (courseId: string) => Promise<void>;
}

export const useCourseDetailsStore = create<CourseDetailsState>((set) => ({
  course: null,
  stats: null,
  changeLog: null,
  isLoading: true,
  error: null,

  // Default values for derived state
  totalEnrolled: 0,
  totalCompleted: 0,
  totalHours: 'N/A',
  totalLessons: 'N/A',
  level: 'Not specified',

  fetchCourseData: async (courseId: string) => {
    set({ isLoading: true, error: null });
    try {
      const [courseRes, statsRes, changeLogRes] = await Promise.all([
        fetchCourseById(courseId),
        fetchCourseStats(courseId),
        fetchCourseChangeLog(courseId),
      ]);

      const course = (courseRes as any)?.data || courseRes || null;
      const stats = (statsRes as any)?.data || statsRes || null;
      const changeLog = (changeLogRes as any)?.data || [];

      // Calculate derived state here
      const totalEnrolled = stats?.totalEnrolled ?? (course as any)?.learnersEnrolled ?? 0;
      const totalCompleted = stats?.totalCompleted ?? (course as any)?.learnersCompleted ?? 0;
      const totalHours = stats?.totalHours ?? (course as any)?.totalHours ?? 'N/A';
      const totalLessons = stats?.totalLessons ?? (course as any)?.lessons ?? 'N/A';
      const level = stats?.complexity ?? 'Not specified';

      set({
        course,
        stats,
        changeLog,
        isLoading: false,
        totalEnrolled,
        totalCompleted,
        totalHours,
        totalLessons,
        level,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false, course: null });
    }
  },
}));
