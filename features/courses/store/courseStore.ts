import { create } from 'zustand';
import { Course } from '../../../types';
import { mockCourses } from '../../../utils/mockData';

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCourses: () => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
  filterCoursesByCategory: (category: string) => Course[];
  searchCourses: (query: string) => Course[];
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use mock data for now
      set({ courses: mockCourses, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch courses',
      });
    }
  },

  getCourseById: (id: string) => {
    return get().courses.find((course) => course.id === id);
  },

  filterCoursesByCategory: (category: string) => {
    if (!category) return get().courses;
    return get().courses.filter((course) => course.category === category);
  },

  searchCourses: (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    return get().courses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowercasedQuery) ||
        course.description.toLowerCase().includes(lowercasedQuery)
    );
  },
}));
