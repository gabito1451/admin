import React from 'react';
import { Column } from '@/components/instructor/table';
import { Course } from './types';

export const courseColumns: Column<Course>[] = [
  {
    header: 'ID',
    render: (course) => `${course.courseId}`,
  },
  {
    header: 'Course Title',
    render: (course) => <span className="whitespace-nowrap">{course.title ?? 'N/A'}</span>,
  },
  {
    header: 'Category',
    render: (course) => `${course.category}`,
  },
  {
    header: 'Date Created',
    render: (course) => {
      const date = course.dateCreated ? new Date(course.dateCreated) : null;
      const formatted = date ? date.toLocaleDateString('en-GB') : 'N/A';
      return <span>{formatted}</span>;
    },
  },
  {
    header: 'Instructor',
    render: (course) => `${course.instructor.firstname}`,
  },
  {
    header: 'No of Learners ',
    render: (course) => `${course.noOfLearners}`,
  },
  {
    header: 'Date updated',
    render: (course) => {
      const date = course.dateUpdated ? new Date(course.dateUpdated) : null;
      const formatted = date ? date.toLocaleDateString('en-GB') : 'N/A';
      return <span>{formatted}</span>;
    },
  },
  {
    header: 'Course rating',
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
];
