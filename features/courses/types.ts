export interface Instructor {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  name: string;
}

export interface Course {
  id: number;
  courseId?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  title?: string;
  category: string;
  dateCreated: string;
  dateUpdated: string;
  instructor: Instructor;
  noOfLearners?: number;
  rating: number;
}

export type PendingCourse = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  duration: string;
  learningObjectives: string[];
  certification: string;
  rating: number;
  status: string;
  instructor: Instructor;
  enrollments: any[];
  hasPendingChanges: boolean;
  dateOfSubmission: string;
  rejectionReason: string | null;
  reviewComments: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  dateCreated: string;
  dateUpdated: string;
};
