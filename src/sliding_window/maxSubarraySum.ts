/**
 * Write a function called maxSubarraySum which accepts an array of integers
 * and a number n. The function should calculate the maximum sum of n consecutive
 * elements in the array.
 */
// if array is empty return null

/**
 * Example: [1, -2, 2, 3, 4, 9, 3, 1, 8, 4], n=3 // returns 16
 */

// const maxSubarraySumBruteForce = (array: number[], n: number): number | null => {
//   // check if array is empty. if so return null
//   if (!array.length) return null;
//   // if array is less than n elements long return sum of what is present
//   if (array.length < n) {
//     let max = 0;
//     for (let i = 0; i < array.length; i += 1) {
//       max += array[i];
//     }
//     return max;
//   }
//   // initialize a max variable to the sum of the first n numbers
//   let max = 0;
//   for (let i = 0; i < n; i += 1) {
//     max += array[i];
//   }
//   // starting with i = 1, iterate through the array up to array.length - 1 - n
//   for (let i = 1; i < array.length - 1 - n; i += 1) {
//     // add sequence of n numbers from i to i+n
//     for (let j = i; j < i + n; j += 1) {
//       // compare current sum to the max and replace max if necessary

//     }
//   }
//   return max;
// };

// Example: [-1, 2, 1, 9, -4, 8, 3] n=3 should return 13
// Example: [-1, 2, 1] n = 3 should return 2
// Example: [] n=3 should return null
// Example: [1, 2, 3] n = 0 should return null
// Example: [2, 3, 4, -5] n = 5 should return null

// Brute Force:

// check if n is greater than the length of the array. If it isn’t then return null
// check if n is 0. If so return null
// initialize a max variable to the sum of the first n elements
// Iterate through the array (starting at 1) and for each element
    // initialize a variable to keep track of the current sum
// iterate from that element’s index to index + n
    // add current elements to the current sum
// compare the current sum and the max. Updating max if necessary
// return max

const maxSubArraysSumBruteForce = (array: number[], n: number): number | null => {
  if (n > array.length) return null;
  if (n === 0) return null;
  let max: number = 0;
  for (let i: number = 0; i < n; i += 1) {
    max += array[i];
  }
  for (let j: number = 1; j < array.length - n; j += 1) {
    let currentSum: number = 0;
    for (let k: number = j; k < j + n; k += 1) {
      currentSum += array[k];
    }
    if (currentSum > max) max = currentSum;
  }
  return max;
};

console.log(maxSubArraysSumBruteForce([1, -2, 2, 3, 4, 9, 3, 1, 8, 4], 3)); // 16
console.log(maxSubArraysSumBruteForce([-1, 2, 1], 3)); // 2
console.log(maxSubArraysSumBruteForce([], 3)); // null
console.log(maxSubArraysSumBruteForce([1, 2, 3], 0)); // null
console.log(maxSubArraysSumBruteForce([2, 3, 4, -5], 5)); // null

// Sliding Window O(n):

// check if n = 0
// check if n > array.length
// initialize max to first n consecutive element sum
// initialize previous sum to be max
// iterate through the array
//  just subtract the current element from the previous sum and add next element to previous sum
// compare previous sum to max and update max if necessary
// return max

const maxSubArraysSum = (array: number[], n: number): number | null => {
  if (n > array.length) return null;
  if (n === 0) return null;
  let max: number = 0;
  for (let i = 0; i < n; i += 1) {
    max += array[i];
  }
  let previousSum = max;
  for (let j = 1; j < array.length - n; j += 1) {
    previousSum += array[j - 1 + n] - array[j - 1];
    if (previousSum > max) max = previousSum;
  }
  return max;
};

console.log(maxSubArraysSum([1, -2, 2, 3, 4, 9, 3, 1, 8, 4], 3)); // 16
console.log(maxSubArraysSum([-1, 2, 1], 3)); // 2
console.log(maxSubArraysSum([], 3)); // null
console.log(maxSubArraysSum([1, 2, 3], 0)); // null
console.log(maxSubArraysSum([2, 3, 4, -5], 5)); // null
