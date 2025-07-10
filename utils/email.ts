import { Assignment } from '../types';

/**
 * In a real application, this would be a server-side function
 * that would send an actual email. For this demo, we're just
 * simulating the email sending process.
 */
export const sendAssignmentEmail = async (assignment: Assignment): Promise<boolean> => {
  console.log(`Sending email notification for assignment: ${assignment.id}`);
  console.log(`Course: ${assignment.courseId}`);
  console.log(`Assigned to: ${assignment.assignedTo.type} - ${assignment.assignedTo.name}`);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real application, you'd make an API call to your email service here

  return true;
};
