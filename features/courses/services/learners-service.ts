'use client';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchLearners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/learners`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Learners');
  }
};

export const fetchLearnerById = async (learnerId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/learner/${learnerId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch Learner by ID');
  }
};

export const createLearner = async (learnerData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/learners`, learnerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create Learner');
  }
};

export const assignCourse = async (learnersIds: string[], coursesIds: string[]) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/learner/assign-course`,
      { learnersIds, coursesIds },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to assign Course to Learner');
  }
};