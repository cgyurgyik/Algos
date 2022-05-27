import { describe, expect, it } from '@jest/globals';
import olympiadProblemset from '../dist/combinatorics/olympiad_problemset';

describe('olympiadProblemset (bitwise combination) test', () => {
  let constraints;
  let difficultyScores;
  it('should return 0 if there are no scores', () => {
    constraints = [0, 0, 0, 0];
    difficultyScores = [];
    expect(olympiadProblemset(constraints, difficultyScores)).toBe(0);
  });
});
