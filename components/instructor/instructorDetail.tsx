'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { CustomTable, Column } from '@/components/instructor/table';
import Loader from '../layout/Loader';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

type Instructor = {
  id: number;
  instructorId: string;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  registeredOn: string;
  noOfCourses: number;
};

type Course = {
  id: number;
  courseId: string;
  title: string;
  createdAt: string | null;
  totalEnrolled: number;
  totalCompleted: number;
  completionRate: string;
  rating: number;
  status: string;
};

const InstructorDetailsPage = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstructor = async () => {
    try {
      const res = await api.get<{ data?: { data?: any[] } }>('/instructors/active');
      const instructors = res.data?.data?.data || [];
      const found = instructors.find((inst: any) => String(inst.id) === String(id));
      setInstructor(found ?? null);
    } catch (err) {
      console.error('Failed to fetch instructor', err);
    }
  };

  const fetchInstructorCourses = async (instructorId: number) => {
    try {
      const res = await api.get<{ data?: { courseStats: Course[] } }>(
        `/instructors/${instructorId}/detail`
      );

      const courseStats = (res.data?.data?.courseStats ?? []).map((course, idx) => ({
        ...course,
        id: course.id ?? idx,
      }));
      setCourses(courseStats);
    } catch (err) {
      console.error('Failed to fetch instructor courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInstructor();
    }
  }, [id]);

  useEffect(() => {
    if (instructor?.id) {
      fetchInstructorCourses(instructor.id);
    }
  }, [instructor?.id]);

  if (loading) return <Loader />;
  if (!instructor) return <p className="p-6">Instructor not found</p>;

  const initials =
    `${instructor.firstname?.[0] ?? ''}${instructor.lastname?.[0] ?? ''}`.toUpperCase();

  const columns: Column<Course>[] = [
    { header: 'Course Title', render: (course) => course.title },
    {
      header: 'Date Created',
      render: (course) => {
        if (!course.createdAt) return 'N/A';
        const date = new Date(course.createdAt);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      header: 'Enrollment Count',
      render: (course) => `${course.totalEnrolled}`,
    },
    {
      header: 'Completion Count',
      render: (course) => `${course.totalCompleted}`,
    },
    {
      header: 'Course Rating',
      render: () => (
        <div className="flex flex-row items-center justify-center">
          <span>4.6</span>
          <img
            src="/assets/icons/star.svg"
            alt="Rating"
            style={{ width: 40, height: 12, marginLeft: 4 }}
          />
        </div>
      ),
    },
    {
      header: 'Course status',
      render: (course) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            course.status === 'live'
              ? 'bg-green-50 text-green-500'
              : course.status === 'pending'
                ? 'bg-academy-orange-50 text-academy-orange'
                : 'bg-red-100 text-red-500'
          }`}
        >
          {course.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-academy-orange text-white h-[280px] md:h-[183px] sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="font-product-sans border-r border-[5px] border-white bg-brown-1 mt-[30px] md:mt-[100px] w-16 h-16 md:w-[198px] md:h-[198px] rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold">
            <span className="h-10 w-9 md:h-[144px] md:w-[140px] pr-2 text-[30px] md:text-[96px] font-normal flex justify-center items-center">
              {initials}
            </span>
          </div>

          <div className="mt-10 pl-4 text-center sm:text-left">
            <h2 className="text-[32px] sm:text-2xl font-bold">
              {instructor.firstname} {instructor.lastname}
            </h2>
            <p className="text-[18px] font-normal sm:text-base">
              Department: {instructor.department}
            </p>
            <p className="text-[18px] font-normal sm:text-base">{instructor.email}</p>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end">
          <button className="font-be-vietnam-pro bg-white text-academy-orange rounded-md mt-0 md:mt-20 font-medium shadow hover:bg-orange-100 transition text-[14px] px-3 py-1.5 sm:text-sm sm:px-4 sm:py-2">
            Deactivate Instructor
          </button>
        </div>
      </div>

      <div className="font-bold text-neutrals-9 text-[18px] mt-28 mb-5 px-5">Courses created</div>

      {courses.length === 0 ? (
        <p className="px-5 text-sm text-gray-500">No courses found for this instructor.</p>
      ) : (
        <CustomTable<Course> data={courses} columns={columns} pageSize={10} onRowClick={() => {}} />
      )}
    </div>
  );
};

export default InstructorDetailsPage;
