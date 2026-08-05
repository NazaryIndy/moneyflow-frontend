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

export const findById = <T extends { id: string }>(items: T[], id: string): T | undefined => {
  return items.find((item) => item.id === id);
};

export const findByName = <T extends { name: string }>(items: T[], name: string): T | undefined => {
  const normalizedName = name.trim().toLowerCase();

  return items.find((item) => item.name.trim().toLowerCase() === normalizedName);
};
