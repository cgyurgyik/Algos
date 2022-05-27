import { describe, expect, it } from '@jest/globals';
import { sumExists } from '../dist/combinatorics/bitmask_target_sum';

describe('findSum bitwise combination test', () => {
  // const maxN = 20;
  // const maxVal = 109;
  let array;
  let target;
  it('should return false for empty array even if target is 0', () => {
    array = [];
    target = 0;
    expect(sumExists(array, target)).toBe(false);
  });
  it('should return true for values where sum exists and target is zero', () => {
    array = [-2, 2, 3];
    target = 0;
    expect(sumExists(array, target)).toBe(true);
  });
});
