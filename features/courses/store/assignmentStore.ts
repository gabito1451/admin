import { create } from 'zustand';
import { Assignment, AssignmentFormData, Course, User } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import { sendAssignmentEmail } from '../../../utils/email';

interface AssignmentState {
  assignments: Assignment[];
  isLoading: boolean;
  error: string | null;

  // Actions
  assignCourse: (data: AssignmentFormData, currentUser: User) => Promise<Assignment[]>;
  getAssignmentsByCourse: (courseId: string) => Assignment[];
  removeAssignment: (assignmentId: string) => void;
  updateAssignment: (assignmentId: string, data: Partial<Assignment>) => void;
}

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  assignments: [],
  isLoading: false,
  error: null,

  assignCourse: async (data: AssignmentFormData, currentUser: User) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const { assignments } = get();
      const newAssignments: Assignment[] = [];

      // Create new assignments for each assignee
      for (const assignee of data.assignees) {
        // Check for duplicate assignments
        const isDuplicate = assignments.some(
          (a) =>
            a.courseId === data.courseId &&
            a.assignedTo.type === assignee.type &&
            a.assignedTo.id === assignee.id &&
            a.status === 'active'
        );

        if (!isDuplicate) {
          const newAssignment: Assignment = {
            id: uuidv4(),
            courseId: data.courseId,
            assignedTo: assignee,
            assignedBy: currentUser,
            assignedAt: new Date().toISOString(),
            endDate: data.endDate,
            notes: data.notes,
            status: 'active',
          };

          newAssignments.push(newAssignment);

          // Send email notification (in a real app this would be a server-side operation)
          sendAssignmentEmail(newAssignment);
        }
      }

      // Update store with new assignments
      set((state) => ({
        assignments: [...state.assignments, ...newAssignments],
        isLoading: false,
      }));

      return newAssignments;
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to assign course',
      });
      return [];
    }
  },

  getAssignmentsByCourse: (courseId: string) => {
    const { assignments } = get();
    return assignments.filter((assignment) => assignment.courseId === courseId);
  },

  removeAssignment: (assignmentId: string) => {
    set((state) => ({
      assignments: state.assignments.filter((a) => a.id !== assignmentId),
    }));
  },

  updateAssignment: (assignmentId: string, data: Partial<Assignment>) => {
    set((state) => ({
      assignments: state.assignments.map((a) => (a.id === assignmentId ? { ...a, ...data } : a)),
    }));
  },
}));
