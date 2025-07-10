import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, formatString: string = 'dd/MM/yyyy'): string {
  try {
    const parsedDate = new Date(dateString); // handles non-ISO format
    return format(parsedDate, formatString);
  } catch (error) {
    return dateString;
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}
