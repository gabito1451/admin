'use client';

import { useEffect } from 'react';
import { CustomTable, Column } from './table';
import { fetchInviteStatus } from '@/features/instructor/services';
import { useInstructorStore } from '@/features/instructor/store/instructor-store';
import { User } from '@/features/instructor/store/instructor-store';

export default function InviteStatus() {
  const { filteredUsers, setUsers } = useInstructorStore();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchInviteStatus();
        setUsers(users);
      } catch (error) {}
    };

    loadUsers();
  }, [setUsers]);

  const columns: Column<User>[] = [
    {
      header: "Instructor's Name",
      render: (user) => `${user.firstname} ${user.lastname}`,
    },
    {
      header: 'Email Address',
      render: (user) => user.email,
    },
    {
      header: 'Expertise/Dept.',
      render: (user) => user.department,
    },
    {
      header: 'Invitation Date',
      render: (user) => {
        const date = new Date(user.createdAT.toString());
        const formatted = date.toLocaleDateString('en-GB');
        return formatted;
      },
    },

    {
      header: 'Status',
      render: (user) => {
        let bgColor = 'bg-gray-100';
        let textColor = 'text-gray-600';
        let label = user.status ?? 'Not Available';

        switch (user.status?.toLowerCase()) {
          case 'accepted':
            bgColor = 'bg-green-50';
            textColor = 'text-green-500';
            break;
          case 'expired':
            bgColor = 'bg-red-50';
            textColor = 'text-red-500';
            break;
          case 'sent':
            bgColor = 'bg-academy-orange-50';
            textColor = 'text-academy-orange';
            break;
          default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-600';
            break;
        }
        return (
          <span className={`px-2 py-1 rounded ${bgColor} ${textColor} text-xs font-semibold`}>
            {label}
          </span>
        );
      },
    },
  ];

  return (
    <div className="py-4 bg-white rounded-lg shadow-md">
      <CustomTable<User> data={filteredUsers} columns={columns} pageSize={10} />
    </div>
  );
}
