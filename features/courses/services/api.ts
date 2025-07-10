import axios from 'axios';
import { Course, PendingCourse } from '../types';

export async function fetchCoursesAPI(): Promise<Course[]> {
  const res = await axios.get<Course[]>(
    'https://leadwayacademyadminaapi-test.azurewebsites.net/api/courses'
  );
  return res.data;
}

export async function fetchPendingCoursesAPI(): Promise<PendingCourse[]> {
  const res = await axios.get<{ data: PendingCourse[] }>(
    'https://leadwayacademyadminaapi-test.azurewebsites.net/courses/pending'
  );
  return res.data.data;
}

export async function fetchRejectedCoursesAPI(): Promise<PendingCourse[]> {
  const res = await axios.get<{ data: PendingCourse[] }>(
    'https://leadwayacademyadminaapi-test.azurewebsites.net/courses/rejected'
  );
  return res.data.data;
}
