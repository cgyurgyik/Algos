/* eslint-disable no-bitwise */

/**
 * Consider this problem: You are given 𝑁≤20 numbers, each up to 109.
 * Is there a subset with sum equal to given goal 𝑆
 * It can be solved with recursion but there's a very elegant iterative approach
 * that iterates over every number 𝑥 from 0 to 2𝑛−1 and considers 𝑥 to be a
 * binary number of length 𝑛, where bit 1 means taking a number and bit 0 is not taking.
 * Understanding this is crucial to solve any harder problems with bitwise operations.
 */
// eslint-disable-next-line import/prefer-default-export
export const sumExists = (arr: number[], target: number): boolean => {
  // define number of iterations to create each combination
  const numCombinations: number = 1 << arr.length; // NOTE: 1 << n is 2^n see left shift
  // iterate through each combination of elements of arr
  // NOTE: we skip the empty set in the subset to avoid confusion
  // (otherwise if the target is 0 it will always return true)
  for (let currCombination: number = 1; currCombination < numCombinations; currCombination += 1) {
    // declare sum that will hold current sum of elements in current combination
    let sum: number = 0;
    // loop through each element in our array arr and create a bitmask to check
    // if that element is present in our current combination
    for (let currElement: number = 0; currElement < arr.length; currElement += 1) {
      // declare bitmask for current element by left bitshifting
      const bitmask: number = 1 << currElement;
      // check if the current element that the current mask is representing is present in the
      // current combination
      if (bitmask & currCombination) {
        sum += arr[currElement];
      }
    }
    // check if sume is equal to target if it is return true
    if (sum === target) return true;
  }
  // target was not found
  return false;
};
