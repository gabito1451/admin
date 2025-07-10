'use client';

import { useEffect, useState } from 'react';
import { DashboardCard } from '@/components/dashboard/dashboard-card';
import { CourseApprovalCard } from '@/components/dashboard/courses-approval-card';
import { fetchDashboardStats, fetchCourseApprovals } from '@/features/dashboard/dashboard-service';
import { CustomTable } from '@/components/instructor/table';
import { fetchLiveCourses } from '@/features/courses/services/course-service';
import { Course } from '@/features/courses/types';
import { courseColumns } from '@/features/courses/column';
import Loader from '@/components/layout/Loader';

interface Approval {
  dateCreated: string;
  id: string;
  title: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({ courses: 0, learners: 0, instructors: 0 });
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [showAllPendingApprovals, setshowAllPendingApprovals] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response: any = await fetchLiveCourses();
        const data = Array.isArray(response) ? response : response?.data || response?.items || [];
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardStats();
        setStats(dashboardData);

        const approvalData = await fetchCourseApprovals();
        setApprovals(approvalData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingApprovals(false);
      }
    };

    loadData();
  }, []);

  const displayedApprovals = showAllPendingApprovals ? approvals : approvals.slice(0, 2);

  return (
    <div className="py-6">
      <h1 className="font-product-sans text-[32px] font-normal mb-8">
        Good Morning, Essa{' '}
        <span className="inline-block animate-wave [animation-delay:1s] [transform-origin:70%_70%]">
          👋
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 w-full">
          <DashboardCard
            label="Courses"
            count={stats.courses ?? 0}
            iconSrc="/assets/icons/book.svg"
          />
          <DashboardCard
            label="Learners"
            count={stats.learners ?? 0}
            iconSrc="/assets/icons/teacher.svg"
          />
          <DashboardCard
            label="Instructors"
            count={stats.instructors ?? 0}
            iconSrc="/assets/icons/learner.svg"
            className="h-[36px] w-[36px]"
          />
        </div>

        <div
          className="bg-white rounded-xl shadow w-full sm:w-full md:max-w-[340px] h-[190px] scrollbar-hide overflow-y-auto px-4"
          style={{ backgroundColor: 'white' }}
        >
          <div className="flex sticky top-0 z-10 bg-white justify-between items-center pt-4">
            <h2 className="pl-5 font-medium text-[16px] text-black-3 font-product-sans">
              Course Approval
            </h2>
            <button
              onClick={() => setshowAllPendingApprovals((prev) => !prev)}
              className="text-academy-orange underline underline-offset-4 text-[14px] font-product-sans font-normal cursor-pointer"
            >
              {showAllPendingApprovals ? 'Show less' : 'View all'}
            </button>
          </div>

          <div className="flex pt-8 gap-4 flex-col">
            {loadingApprovals ? (
              <Loader />
            ) : displayedApprovals.length === 0 ? (
              <p className="text-center text-gray-500">No course approvals available.</p>
            ) : (
              displayedApprovals.map((item) => (
                <CourseApprovalCard
                  key={item.id}
                  title={item.title}
                  dateCreated={new Date(item.dateCreated)
                    .toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })
                    .toLowerCase()}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center hide-scrollbar mb-4 mt-10">
        <h2 className="font-bold text-[20px] text-neutrals-10 font-product-sans">Live courses</h2>
        <a
          href="#"
          className="text-academy-orange pr-5 underline underline-offset-4 text-[14px] font-product-sans font-normal"
        >
          View all
        </a>
      </div>

      <div>
        <CustomTable<Course> data={courses} columns={courseColumns} pageSize={10} />
      </div>
    </div>
  );
}
