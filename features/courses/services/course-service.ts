'use client';
import { Course } from '../types';
import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/course`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Courses');
  }
};

export const fetchLiveCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/live`);
    console.log('Live Courses Response:');

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'Failed to fetch live Courses');
  }
};

export const fetchCourseById = async (courseId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Course by ID');
  }
};

export const createCourse = async (courseData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/courses`, courseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create Course');
  }
};

// 🔍 Fetch and filter courses by category
export const filterCoursesByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/course`);
    const courses = response.data as any[];

    if (!category) return courses;

    return courses.filter((course: any) => course.category === category);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to filter courses by category');
  }
};

// 🔍 Search courses by title or description
export const searchCourses = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/course`);
    const courses = response.data as any[];
    const lowercasedQuery = query.toLowerCase();

    return courses.filter(
      (course: any) =>
        course.title.toLowerCase().includes(lowercasedQuery) ||
        course.description.toLowerCase().includes(lowercasedQuery)
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to search courses');
  }
};

export const fetchCourseStats = async (courseId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}/stats`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch course stats');
  }
};

export const fetchCourseChangeLog = async (courseId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${courseId}/changeLog`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch course change log');
  }
};
