import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

interface CoursesStatisticsResponse {
  data: {
    totalCourses: number;
  };
}

interface LearnerResponse {
  data: {
    data: {
      length: number;
    };
  };
}

interface ActiveInstructorsResponse {
  data: {
    data: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      instructorId: string;
      department: string;
      briefBio: string | null;
      avater: string | null;
      noOfCourses: number;
      registeredOn: string;
    }[];
  };
}
interface CourseApprovalResponse {
  data: CourseApproval[];
}

export interface CourseApproval {
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
  dateOfSubmission: string;
  dateCreated: string;
}

export const fetchDashboardStats = async () => {
  const coursesRes = await api.get<CoursesStatisticsResponse>('courses/statistics');
  const learnersRes = await api.get<LearnerResponse>('/learners');
  const instructorsRes = await api.get<ActiveInstructorsResponse>('/instructors/active');

  return {
    courses: coursesRes.data.data.totalCourses,
    learners: learnersRes.data.data.data.length,
    instructors: instructorsRes.data.data.data.length,
  };
};

export async function fetchCourseApprovals(): Promise<CourseApproval[]> {
  const res = await api.get<CourseApprovalResponse>('/courses/pending');
  return res.data.data;
}
