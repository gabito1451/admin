import { create } from 'zustand';
import { Notification, NotificationType } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

interface NotificationState {
  notifications: Notification[];

  // Actions
  addNotification: (
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
  ) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  addNotification: (type: NotificationType, title: string, message: string, duration = 5000) => {
    const id = uuidv4();

    set((state) => ({
      notifications: [...state.notifications, { id, type, title, message, duration }],
    }));

    // Auto-remove after duration
    if (duration !== Infinity) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, duration);
    }

    return id;
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
