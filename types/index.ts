// Common types used across the application
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'instructor' | 'learner';
  avatar?: string;
  department?: string;
  // createdAt: string;
  // updatedAt: string;
}

// export type Course = {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   instructor: User;
//   createdAt: string;
//   updatedAt: string;
//   totalHours: number;
//   lessons: number;
//   level: string;
//   learnersEnrolled: number;
//   learnersCompleted: number;
//   rating: number;
//   tags: string[];
//   learningObjectives: string[];
//   modules?: {
//     id: string;
//     title: string;
//     lessons: {
//       id: string;
//       title: string;
//       duration: string;
//       type: 'video' | 'text' | 'quiz';
//       completed?: boolean;
//     }[];
//     totalLessons: number;
//     duration: string;
//   }[];
//   changeLog?: {
//     id: string;
//     date: string;
//     author: string;
//     changeType:
//       | 'Course Description'
//       | 'Module Content'
//       | 'Assessment'
//       | 'Learning Objectives'
//       | 'General Update';
//     previousContent: string;
//     updatedContent: string;
//   }[];
// };
export interface Course {
  id: string;
  courseId: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  duration: string;
  level: string;
  totalHours?: number | string;
  lessons?: number | string;
  learningObjectives: string[];
  modules: Module[];
  certification: string;
  rating: number;
  status: string;
  instructor: Instructor;
  enrollments: any[];
  hasPendingChanges: boolean;
  dateOfSubmission: string;
  rejectionReason: string | null;
  reviewComments: string | null;
  reviewedBy: string;
  reviewedAt: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface Module {
  id: string;
  type: string;
  order: number;
}

export interface Instructor extends User {
  firstname: string;
  lastname: string;
  briefBio: string | null;
  avatar?: string;
  noOfCourses: number;
  registeredOn: string;
}

export type Assignment = {
  id: string;
  courseId: string;
  assignedTo: {
    type: 'learner' | 'department' | 'specialization';
    id: string;
    name: string;
  };
  assignedBy: User;
  assignedAt: string;
  endDate?: string;
  notes?: string;
  status: 'active' | 'completed' | 'expired';
};

export type Department = {
  id: string;
  name: string;
  memberCount: number;
};

export type Specialization = {
  id: string;
  name: string;
  memberCount: number;
};

export type Learner = User & {
  department: string;
  specialization?: string;
};

export type AssignmentFormData = {
  courseId: string;
  assignees: {
    type: 'learner' | 'department' | 'specialization';
    id: string;
    name: string;
  }[];
  endDate?: string;
  notes?: string;
};

export interface Instructor extends User {
  courses: string[];
  expertise: string[];
  bio?: string;
  rating: number;
  totalStudents: number;
}

export interface DashboardStats {
  totalLearners: number;
  totalInstructors: number;
  totalCourses: number;
  totalRevenue: number;
  recentEnrollments: {
    courseId: string;
    learnerId: string;
    date: string;
  }[];
  popularCourses: {
    courseId: string;
    enrollments: number;
  }[];
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  price: number;
  duration: number;
  level: Course['level'];
  thumbnail?: File;
}

// Store types
export interface AdminStore {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
};

// API Types
export * from './api';

// for instructors management
export interface ModalStore {
  isInviteModalOpen: boolean;
  openInviteModal: () => void;
  closeInviteModal: () => void;
}

export interface DeactivateInstructor {
  isModalOpen: boolean;
  currentInstructor: string | null;
  openModal: (name: string) => void;
  closeModal: () => void;
  deactivate: () => void;
  isDeactivated: boolean;
  reset: () => void;
}

export interface InviteFlowState {
  showConfirmation: boolean;
  showSuccess: boolean;
  inviteeFirstName: string;
  inviteeLastName: string;
  inviteeEmail: string;
  inviteeDepartment: string;
  inviteId: string;
  openConfirmation: (
    firstName: string,
    lastName: string,
    email: string,
    department: string
  ) => void;
  confirmInvite: () => void;
  closeModals: () => void;
}

export interface InstructorStore {
  users: User[];
  filteredUsers: User[];
  setUsers: (users: User[]) => void;
  searchInstructors: (query: string) => void;
}
