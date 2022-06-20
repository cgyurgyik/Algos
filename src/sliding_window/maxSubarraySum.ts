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

const maxSubarraySumRecursive = (array: number[], k: number): number | null => {
  if (k > array.length || k === 0) return null;
  let max: number = 0;
  for (let i: number = 0; i < k; i += 1) {
    max += array[i];
  }
  const innerHelper = (index: number, end: number, currentSum = 0): number => {
    // BASE CASE: index is at end
    if (index === end) return currentSum;
    // RECURSIVE CASE
    return innerHelper(index + 1, end, currentSum + array[index]);
  };
  const helper = (i: number = 1): void => {
    // BASE CASE
    if (i >= array.length - k) return;
    // RECURSIVE CASE
    const currentSum = innerHelper(i, i + k);
    if (currentSum > max) max = currentSum;
    helper(i + 1);
  };

  helper();
  return max;
};

console.log(maxSubarraySumRecursive([1, -2, 2, 3, 4, 9, 3, 1, 8, 4], 3)); // 16
console.log(maxSubarraySumRecursive([-1, 2, 1], 3)); // 2
console.log(maxSubarraySumRecursive([], 3)); // null
console.log(maxSubarraySumRecursive([1, 2, 3], 0)); // null
console.log(maxSubarraySumRecursive([2, 3, 4, -5], 5)); // null

// const maxSubarraySumRecursive2 = (array: number[], k: number): number | null => {
//   if (k > array.length || k === 0) return null;
//   let max: number = -Infinity;
//   const helper = (i: number = 0): void => {
//     // BASE CASE
//     if (i >= array.length - k) return;
//     // RECURSIVE CASE
//     let currentSum = 0;
//     for (let j = 0; j < i + k; j += 1) {
//       currentSum += array[j];
//     }
//     if (currentSum > max) max = currentSum;
//     helper(i + 1);
//   };

//   helper();
//   return max;
// };

// console.log(maxSubarraySumRecursive2([1, -2, 2, 3, 4, 9, 3, 1, 8, 4], 3)); // 16
// console.log(maxSubarraySumRecursive2([-1, 2, 1], 3)); // 2
// console.log(maxSubarraySumRecursive2([], 3)); // null
// console.log(maxSubarraySumRecursive2([1, 2, 3], 0)); // null
// console.log(maxSubarraySumRecursive2([2, 3, 4, -5], 5)); // null

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

/**
 * make sure that the length of the ints array is greater than n (if not return null)
 * to make the pointers more explicit initialize a pointer to point to the nth element
 * initialize a currentSum variable to the sum of the first n elements
 * intialize a maxSum variable and set it to the currentSum
 * starting at the second element iterate through the array of ints
 *  update the pointer to point to the index + n
 *  update currentSum to be the currentSum plus the element at pointer
 *  compare the currentSum to the maxSum and update maxSum if necessary
 * return the maxSum
 */
//  function maxSubarraySum(ints, n){
//   if (ints.length < n) return null;
//   let pointer = n - 1 ;
//   let currentSum = 0;
//   for (let i = 0; i < n; i += 1) {
//       currentSum += ints[i];
//   }
//   let maxSum = currentSum;
//   for (let index = 1; index < ints.length; index += 1) {
//       pointer += 1;
//       currentSum = currentSum + ints[pointer] - ints[index - 1];
//       if (currentSum > maxSum) maxSum = currentSum;
//   }
//   return maxSum;
// }

// variation: maxSubArray: https://leetcode.com/problems/maximum-subarray/
/**
* Given an integer array nums, find the contiguous subarray (containing at least one number)
* which has the largest sum and return its sum.
* A subarray is a contiguous part of an array.
*/

// Example: [-1, 2, 3, 4, 5, -4, 10] should return [20, [2, 3, 4, 5, -4, 10]]
// Example: [10, 2, 5, -50, 16, -1, 3] should return [18, [16, -1, 3]]
// Example: [-1, 2, -3, 4, 5, -4, 10] should return [15, [4, 5, -4, 10]]
// Example: [-1, 7, -3, 4, 5, -10, 100] should return [103, [7, -3, 4, 5, -10, 100]]
// Example: [-1, 7, -12, 80, -10, 4, 5, -10, 100] should return  [156, [80, -10, 4, 5, -10, 100]]

/**
* [-1, 2, -3, 9, -4, 10]
* [-1, 7, -3, 9, -10, 100]
* [-1, 7, -12, 80, -10, 9, -10, 100]
* [9, -10, 7, -12, 80, -10, 9, -10, 100]
* [11, -10, 7, -12, 80, -10, 9, -10, 100]
*/

// just get the sum for now
// initialize a max var to the first non-negative element
// Actually there could only be negative elements so this isn't a good idea
// initialize a sum var to the max
// keep track of the starter pointer to the first element
// and an end pointer
// start iterating starting at the start pointer
// add current element to the sum.
// if updated sum is positive
// check if it is larger than max and if so update max and move end pointer
// otherwise (make sure you have all the info wrt indices and everything of current max)
// reset the sum to 0
// move both start and end pointers
// at the end return all relevant information about the max

/**
 * @param array of integers in any order non-positives and duplicates allowed
 * @returns tuple including the max sum, the start and end indices of the max, all the values
 * that form the max, or null in the case that the array is empty.
 */
const maxSubArray = (array: number[]): [number, number[], number[]] | null => {
  if (!array.length) return null;

  let max: number = array[0];
  const maxIndices: [number, number] = [0, 0];
  const maxValues: number[] = [max];
  let sum: number = max;
  const indices: [number, number] = [0, 0];
  let values: number[] = [sum];

  for (let i = 1; i < array.length;) {
    const currEl = array[i];
    sum += currEl;
    if (sum > max) {
      max = sum;
      maxIndices[1] = i;
      maxValues.push(currEl);
      i += 1;
    }
    // what about all negative numbers?
    if (sum < 0) {
      sum = 0; // this won't work for all negatives
      i += 2; // check out of bounds? this is dangerous and wrong i think
      indices[0] = i;
      values = [];
    } else {
      i += 1;
      values.push(currEl);
    }
    indices[1] = i;
  }
  return [max, maxIndices, maxValues];
};

// var maxSubArray = function (nums) {
//   let maxSum = -Infinity;
//   let currSum = 0;
//   for (let i = 0; i < nums.length; i++) {
//     // compare the current element to the current sum using math.max
//     currSum = Math.max(nums[i], currSum + nums[i]);
//     maxSum = Math.max(currSum, maxSum);
//   }
//   return maxSum;
// };

/**
 *
 */

console.log(maxSubArray([])); // null
console.log(maxSubArray([10])); // [10, [0, 0], [10]]
console.log(maxSubArray([-10])); // [-10, [0, 0], [-10]]
console.log(maxSubArray([0, -10, -5])); // [0, [0,0], [0]]

console.log(maxSubArray([-5, -10, 0])); // [0, [2,2], [0]]

console.log(maxSubArray([-10, -1, -2, -3])); // [-1, [1,1], [-1]]
console.log(maxSubArray([-10, -15, -2, -1])); // [-1, [3,3], [-1]]
console.log(maxSubArray([-10, 80, -15, 5, 4, 100, -20])); // [174, [1, 5], [80, -15, 5, 4, 100]]
console.log(maxSubArray([10, -15, 4, 7, -3])); // [11, [2, 3], [4, 7]]
console.log(maxSubArray([10, -15, 4, 2, -3])); // [10, [0, 0], [10]]
console.log(maxSubArray([1, 10, -15, 4, 2, -3])); // [11, [0, 1], [1, 10]]
