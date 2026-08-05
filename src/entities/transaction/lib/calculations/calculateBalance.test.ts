import { describe, expect, it } from 'vitest';

import { calculateBalance } from './calculateBalance';

describe('calculateBalance', () => {
  it('returns income minus expenses', () => {
    expect(calculateBalance(1000, 400)).toBe(600);
  });

  it('returns negative balance when expenses exceed income', () => {
    expect(calculateBalance(500, 800)).toBe(-300);
  });

  it('returns zero when income equals expenses', () => {
    expect(calculateBalance(500, 500)).toBe(0);
  });
});
