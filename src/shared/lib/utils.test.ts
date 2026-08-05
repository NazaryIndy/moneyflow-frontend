import { describe, expect, it } from 'vitest';
import { cn, findById, findByName, getDaysPassedInMonth, getTotalDaysInMonth } from './utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  it('merges conflicting Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles conditional classes', () => {
    const isHidden = false;

    expect(cn('text-sm', isHidden && 'hidden', 'font-bold')).toBe('text-sm font-bold');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
  });
});

describe('getDaysPassedInMonth', () => {
  it('returns the day of the month', () => {
    expect(getDaysPassedInMonth(new Date(2026, 7, 5))).toBe(5);
  });

  it('returns 1 for the first day of the month', () => {
    expect(getDaysPassedInMonth(new Date(2026, 7, 1))).toBe(1);
  });

  it('returns the last day when given the last day of the month', () => {
    expect(getDaysPassedInMonth(new Date(2026, 7, 31))).toBe(31);
  });
});

describe('getTotalDaysInMonth', () => {
  it('returns 31 days for a 31-day month', () => {
    expect(getTotalDaysInMonth(2026, 7)).toBe(31);
  });

  it('returns 30 days for a 30-day month', () => {
    expect(getTotalDaysInMonth(2026, 3)).toBe(30);
  });

  it('returns 28 days for February in a non-leap year', () => {
    expect(getTotalDaysInMonth(2026, 1)).toBe(28);
  });

  it('returns 29 days for February in a leap year', () => {
    expect(getTotalDaysInMonth(2024, 1)).toBe(29);
  });
});

describe('findById', () => {
  const users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ];

  it('returns an item with the matching id', () => {
    expect(findById(users, '2')).toEqual({
      id: '2',
      name: 'Bob',
    });
  });

  it('returns undefined when the id does not exist', () => {
    expect(findById(users, '999')).toBeUndefined();
  });

  it('works with an empty array', () => {
    expect(findById([], '1')).toBeUndefined();
  });

  it('works with different object types', () => {
    const categories = [
      { id: 'food', name: 'Food', color: '#fff' },
      { id: 'housing', name: 'Housing', color: '#000' },
    ];

    expect(findById(categories, 'housing')).toEqual({
      id: 'housing',
      name: 'Housing',
      color: '#000',
    });
  });
});

describe('findByName', () => {
  const categories = [
    { id: '1', name: 'Food' },
    { id: '2', name: 'Housing' },
    { id: '3', name: 'Transport' },
  ];

  it('returns an item with the matching name', () => {
    expect(findByName(categories, 'Food')).toEqual({
      id: '1',
      name: 'Food',
    });
  });

  it('is case-insensitive', () => {
    expect(findByName(categories, 'food')).toEqual({
      id: '1',
      name: 'Food',
    });
  });

  it('ignores leading and trailing whitespace', () => {
    expect(findByName(categories, '  Housing  ')).toEqual({
      id: '2',
      name: 'Housing',
    });
  });

  it('returns undefined when the name does not exist', () => {
    expect(findByName(categories, 'Salary')).toBeUndefined();
  });

  it('works with an empty array', () => {
    expect(findByName([], 'Food')).toBeUndefined();
  });

  it('works with different object types', () => {
    const users = [
      { id: '1', name: 'Alice', age: 25 },
      { id: '2', name: 'Bob', age: 30 },
    ];

    expect(findByName(users, 'bob')).toEqual({
      id: '2',
      name: 'Bob',
      age: 30,
    });
  });
});
