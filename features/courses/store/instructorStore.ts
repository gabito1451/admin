import { create } from 'zustand';

interface InstructorState {
  instructors: Instructor[];
  getInstructorCourses: (instructorId: string) => Course[];
  getInstructorCredentials: (instructorId: string) => string[];
}
