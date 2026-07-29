import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDaysPassedInMonth = (date: Date): number => {
  return date.getDate();
};

export const getTotalDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};
