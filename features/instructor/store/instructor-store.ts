import { create } from 'zustand';
import axios from 'axios';
import { ModalStore, DeactivateInstructor, InviteFlowState } from '@/types';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: BASE_URL,
});

export interface User {
  invitationDate: string;
  id: number;
  instructorId: number;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  noOfCourses: number;
  registeredOn: string;
  createdAT: String;
  status: string;
}

interface InstructorStore {
  users: User[];
  filteredUsers: User[];
  setUsers: (users: User[]) => void;
  searchInstructors: (query: string) => void;
}

export const useInstructorModalStore = create<ModalStore>((set) => ({
  isInviteModalOpen: false,
  openInviteModal: () => set({ isInviteModalOpen: true }),
  closeInviteModal: () => set({ isInviteModalOpen: false }),
}));

export const useDeactivateInstructor = create<DeactivateInstructor>((set) => ({
  isModalOpen: false,
  isDeactivated: false,
  currentInstructor: null,
  openModal: (instructor) =>
    set({ isModalOpen: true, currentInstructor: instructor, isDeactivated: false }),
  closeModal: () => set({ isModalOpen: false, currentInstructor: null }),
  deactivate: () => set({ isDeactivated: true }),
  reset: () => set({ isModalOpen: false, isDeactivated: false, currentInstructor: null }),
}));

export const useInviteFlowStore = create<InviteFlowState>((set, get) => ({
  showConfirmation: false,
  showSuccess: false,
  inviteeFirstName: '',
  inviteeLastName: '',
  inviteeEmail: '',
  inviteeDepartment: '',
  inviteId: '',
  openConfirmation: (firstName, lastName, email, department) =>
    set({
      showConfirmation: true,
      inviteeFirstName: firstName,
      inviteeLastName: lastName,
      inviteeEmail: email,
      inviteeDepartment: department,
    }),
  confirmInvite: async () => {
    const { inviteeEmail, inviteeFirstName, inviteeLastName, inviteeDepartment } = get();

    try {
      const response = await api.post<{ inviteId: string }>('/invitations', {
        email: inviteeEmail,
        firstname: inviteeFirstName,
        lastname: inviteeLastName,
        department: inviteeDepartment,
      });

      const { inviteId } = response.data;

      set({
        showConfirmation: false,
        showSuccess: true,
        inviteId,
      });
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message || 'An unknown error occurred';

      console.error('Failed to send invite:', {
        status,
        message,
      });

      if (status === 409 || message.toLowerCase().includes('already')) {
        alert('An invite has already been sent to this email.');
      } else if (status === 500 && message.toLowerCase().includes('email')) {
        alert('Failed to send the invitation email. Please try again.');
      } else {
        alert(`Failed to send invite: ${message}`);
      }

      set({
        showConfirmation: false,
        showSuccess: false,
        inviteId: '',
      });
    }
  },
  closeModals: () =>
    set({
      showConfirmation: false,
      showSuccess: false,
      inviteeFirstName: '',
      inviteeLastName: '',
      inviteId: '',
      inviteeEmail: '',
      inviteeDepartment: '',
    }),
}));

export const useInstructorStore = create<InstructorStore>((set, get) => ({
  users: [],
  filteredUsers: [],
  setUsers: (users) => set({ users, filteredUsers: users }),
  searchInstructors: (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = get().users.filter(
      (user) =>
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.department.toLowerCase().includes(lowerQuery) ||
        user.createdAT.toLowerCase().includes(lowerQuery)
    );
    set({ filteredUsers: filtered });
  },
}));
