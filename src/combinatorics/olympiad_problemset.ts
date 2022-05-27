/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-bitwise */

/**
* You have n problems. You have estimated the difficulty of the i-th one as integer ci.
Now you want to prepare a problemset for a contest, using some of the problems you've made.

A problemset for the contest must consist of at least two problems. You think that the total
difficulty of the problems of the contest must be at least l and at most r. Also, you think
that the difference between difficulties of the easiest and the hardest of the chosen problems
must be at least x.

Find the number of ways to choose a problemset for the contest.
Input

The first line contains four integers n, l, r, x (1 ≤ n ≤ 15, 1 ≤ l ≤ r ≤ 109, 1 ≤ x ≤ 106)
- the number of problems you have, the minimum and maximum value of total difficulty of the
problemset and the minimum difference in difficulty between the hardest problem in the pack and
the easiest one, respectively.

The second line contains n integers c1, c2, ..., cn (1 ≤ ci ≤ 106) — the difficulty of each problem.
Output

Print the number of ways to choose a suitable problemset for the contest.
*/

export default (constraints: number[], difficultyScores: number[]): number => {
  // deconstruct values of constraint array
  const [n, l, r, x] = constraints;
  // track number of combinations that work
  let result: number = 0;
  // define number of combinations
  const tot: number = 1 << n;
  // outer loop
  for (let i: number = 3; i < tot; i += 1) {
    // A problemset for the contest must consist of at least two problems
    // so we skip the first three (empty set, first element, second element) combinations
    // and then we should check for all i's that are powers of 2 afterwards
    // (they correspond to single element combinations)
    // NOTE: we're checking if i is a power of two on the line below (example:
    // i = 8 = 1000 then i - 1 = 0111, so i & (i - 1) = 0000)
    if ((i & (i - 1)) !== 0) {
      // keep track of max, min, sum
      let sum: number = 0;
      // TODO: figure out if there's a better way to do this.
      let max: number | undefined;
      let min: number | undefined;
      // masking loop
      for (let j: number = 0; j < n; j += 1) {
        const bitmask: number = 1 << j;
        if (bitmask & i) {
          const currElement: number = difficultyScores[j];
          // check if current element is less than min or more than max
          if (min === undefined || currElement < min) min = currElement;
          if (max === undefined || currElement > max) max = currElement;
          sum += currElement;
          // break if sum is greater than allowed upper limit (r)
          if (sum > r) break;
        }
      }
      // check if sum is greater or equal to the allowed lower limit (l)
      // check if sum is less or equal to the allowed upper limit (r)
      // check if delta between max and min is greater or equal to the allowed delta (x)
      if (sum >= l && sum <= r
        && max !== undefined
        && min !== undefined
        && (max - min) >= x
      ) result += 1;
    }
  }
  return result;
};

const olympiad = (constraints: number[], difficultyScores: number[]): number => {
  // deconstruct values of constraint array
  const [n, l, r, x] = constraints;
  // track number of combinations that work
  let result: number = 0;
  // define number of combinations
  const tot: number = 1 << n;
  // outer loop
  for (let i: number = 3; i < tot; i += 1) {
    // A problemset for the contest must consist of at least two problems
    // so we skip the first three (empty set, first element, second element) combinations
    // and then we should check for all i's that are powers of 2 afterwards
    // (they correspond to single element combinations)
    // NOTE: we're checking if i is a power of two on the line below (example:
    // i = 8 = 1000 then i - 1 = 0111, so i & (i - 1) = 0000)
    if ((i & (i - 1)) !== 0) {
      // keep track of max, min, sum
      let sum: number = 0;
      let max: number | undefined;
      let min: number | undefined;
      // masking loop
      for (let j: number = 0; j < n; j += 1) {
        const bitmask: number = 1 << j;
        if (bitmask & i) {
          const currElement: number = difficultyScores[j];
          // check if current element is less than min or more than max
          if (min === undefined || currElement < min) min = currElement;
          if (max === undefined || currElement > max) max = currElement;
          sum += currElement;
          // break if sum is greater than allowed upper limit (r)
          if (sum > r) break;
        }
      }
      // check if sum is greater or equal to the allowed lower limit (l)
      // check if sum is less or equal to the allowed upper limit (r)
      // check if delta between max and min is greater or equal to the allowed delta (x)
      if (sum >= l && sum <= r
        && max !== undefined
        && min !== undefined
        && (max - min) >= x
      ) result += 1;
    }
  }
  return result;
};

let testConstraints = [3, 5, 6, 1];
let testDifficultyScores = [1, 2, 3];
console.log(olympiad(testConstraints, testDifficultyScores));

testConstraints = [5, 25, 35, 10];
testDifficultyScores = [10, 10, 20, 10, 20];
console.log(olympiad(testConstraints, testDifficultyScores));
