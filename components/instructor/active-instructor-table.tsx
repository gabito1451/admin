'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CustomTable, Column } from './table';
import { useInstructorStore, User } from '@/features/instructor/store/instructor-store';
import { fetchInstructors } from '@/features/instructor/services';
import { Checkbox } from '../ui/checkbox';

export function InstructorTable() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const router = useRouter();
  const { filteredUsers, setUsers } = useInstructorStore();

  useEffect(() => {
    const getInstructors = async () => {
      try {
        const data = await fetchInstructors();

        setUsers(data);
      } catch (error) {}
    };

    getInstructors();
  }, [setUsers]);

  useEffect(() => {}, [filteredUsers]);

  const handleCheckboxChange = (id: string) => {
    setSelectedUserId(id === selectedUserId ? null : id);
  };

  const handleViewDetails = (user: any) => {
    router.push(`/dashboard/instructors/${user.id}`);
  };

  const columns: Column<User>[] = [
    {
      header: <Checkbox className="mr-3 mt-1 h-4 w-4  data-[state=checked]:bg-academy-orange" />,
      render: (user) => (
        <Checkbox
          className=" data-[state=checked]:bg-academy-orange  h-4 w-4"
          checked={String(user.id) === selectedUserId}
          onCheckedChange={() => handleCheckboxChange(String(user.id))}
        />
      ),
    },
    {
      header: 'ID',
      render: (user) => {
        return <span className="whitespace-nowrap">{user.instructorId ?? 'N/A'}</span>;
      },
    },
    {
      header: "Instructor's Name",
      render: (user) => (
        <span>
          {user.firstname} {user.lastname}
        </span>
      ),
    },
    { header: 'Email Address', render: (user) => <span>{user.email}</span> },
    { header: 'Expertise/Dept.', render: (user) => <span>{user.department}</span> },
    {
      header: 'Registered on',
      render: (user) => <span>{new Date(user.registeredOn).toLocaleDateString()}</span>,
    },
    { header: 'No of Courses', render: (user) => <span>{user.noOfCourses}</span> },
    {
      header: 'Action',
      render: (user) => (
        <button
          className="text-orange-500 underline underline-offset-4 text-sm whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(user);
          }}
        >
          View instructor
        </button>
      ),
    },
  ];

  return (
    <div className="py-4 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto scrollbar-hide md:block">
        <CustomTable<any>
          data={filteredUsers}
          columns={columns}
          pageSize={10}
          onRowClick={(user) => handleViewDetails(user)}
        />
      </div>
    </div>
  );
}
