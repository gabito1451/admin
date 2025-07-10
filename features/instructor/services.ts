import axios from 'axios';
import { User } from './store/instructor-store';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchInstructors = async (): Promise<User[]> => {
  try {
    const response = (await api.get('/instructors/active')) as {
      data?: { data?: { data?: any[] } };
    };
    const rawList = response.data?.data?.data ?? [];

    const transformed: User[] = rawList.map((item: any) => ({
      id: item.id,
      instructorId: item.id,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      status: item.status ?? 'Unknown',
      department: item.department ?? 'Unknown',
      noOfCourses: item.noOfCourses ?? 0,
      registeredOn: item.registeredOn,
      invitationDate: item.invitationDate ?? '',
      createdAT: item.createdAt ?? '',
    }));

    return transformed;
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return [];
  }
};

export const fetchInviteStatus = async (): Promise<any[]> => {
  try {
    const response = (await api.get('/instructors/allinvited')) as {
      data?: { data?: { data?: any[] } };
    };
    const rawList = response.data?.data?.data ?? [];

    const transformed: User[] = rawList.map((item: any) => ({
      id: item.id,
      instructorId: item.id,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      department: item.department ?? 'Unknown',
      noOfCourses: item.noOfCourses ?? 0,
      registeredOn: item.registeredOn,
      status: item.status ?? 'Unknown',
      invitationDate: item.invitationDate ?? '',
      createdat: item.createdAt ?? '',
      createdAT: item.createdAt ?? 'NA',
    }));

    return transformed;
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return [];
  }
};
