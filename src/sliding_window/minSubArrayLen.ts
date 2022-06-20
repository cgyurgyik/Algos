/**
 * minSubArrayLen
 * Write a function called minSubArrayLen that takes in an array of positive
 * integers and a postive integer.
 * This function should return the minimal length of a contiguous subarray
 * of which the sum is greater than or equal to the integer passed in the function.
 * If there isn't one return 0 instead.
 */

/**
 * Examples:
 * [], 8 EXPECT 0
 * [-2], 8 EXPECT 0
 * [8], 8 EXPECT 1
 * [9], 8 EXPECT 1
 * [-2, 4, 5], 8 EXPECT 2
 * [-2, 3, 4, -5, 3, 3, 3, 7], 8 EXPECT 2
 */

// USE INCH WORM
const minSubArrayLen = (array: number[], target: number) => {
  // check if array is empty
  if (!array.length) return 0;
  // check if the array has at least two elements
  // and if first element hits the target
  if (array[0] >= target) return 1;
  if (array.length === 1) return 0;

  // initialize variables
  let minLen: number = Infinity;
  let begin: number = 0;
  let end: number = 1;
  let currSum: number = array[begin] + array[end];

  while (begin < array.length - 1) {
    // check if value of end element is greater or equal to target
    if (array[end] >= target) return 1;
    if (currSum < target && end < array.length - 1) {
      end += 1;
      currSum += array[end];
    }
    // if your end pointer is pointing at the last index
    // move up your begin pointer and update current sum
    else if (currSum < target && end === array.length - 1) {
      currSum -= array[begin];
      begin += 1;
    } else if (currSum >= target) {
      minLen = Math.min(minLen, (end - begin + 1));
      currSum -= array[begin];
      begin += 1;
    }
  }
  return minLen;
};

console.log(minSubArrayLen([], 8)); // 0
console.log(minSubArrayLen([-2], 8)); // 0
console.log(minSubArrayLen([8], 8)); // 1
console.log(minSubArrayLen([9], 8)); // 1
console.log(minSubArrayLen([-2, 4, 5], 8)); // 2
console.log(minSubArrayLen([9, 2, -4, 3, 3, 3, 4, -100, 4, 4], 8)); // 1
console.log(minSubArrayLen([2, -4, 3, 3, 3, 4, -100, 4, 4], 8)); // 2
console.log(minSubArrayLen([2, -4, 3, 3, 3, 4, -100, 4], 8)); // 3
console.log(minSubArrayLen([-2, 3, 4, -5, 3, 3, 3, 7], 8)); // 2
