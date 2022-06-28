/*
(1) Given an integer array nums, return an array answer such that answer[i]
is equal to the product of all the elements of nums except nums[i].

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
*/

/**
 * initialize a product variable
 * initialize an output array
 * iterate through the array nums and calculate the product
 * iterate through from index 0 to less than length of array and
 * divide by the current element of nums at the index and store the result
 */

// const productExcludeAtIndex = (arr: number[]): number[] | null => {
//   if (!arr.length) return null;
//   let product: number = 1;
//   const output: number[] = new Array(arr.length);
//   for (let i = 0; i < arr.length; i += 1) {
//     const currEl: number = arr[i];
//     // deal with zeros
//     if (currEl) product *= currEl;
//   }
//   for (let j = 0; j < arr.length; j += 1) {
//     const currEl: number = arr[j];
//     // check if current element is 0. can't divide by 0
//     if (!currEl) {
//       // set output at j to the product
//       // set every other 
//     }
//     output[j] = product / currEl;
//   }
// };

/**
 * init output array to all 0s
 * go through the array and store the index of the first 0
 * as well as the number of zeros present
 * init a flag for more than one 0
 * also store product (full product for no or >1 0s, or product not including one 0)
 * construct output appropriately
 */

const productExcludeAtIndex = (arr: number[]): number[] | null => {
  if (!arr.length) return null;
  const output: number[] = new Array(arr.length).fill(0);
  let numZeros: number = 0;
  let firstZeroIndex: number = -1;
  let product: number = 1;
  arr.forEach((currEl: number, i: number): void => {
    if (currEl) product *= currEl;
    else if (!numZeros) {
      numZeros = 1;
      firstZeroIndex = i;
    } else numZeros += 1;
  });
  arr.forEach((currEl: number, j: number) => {
    // NOTE: output initialized to all 0s so we don't
    // need to check for numZeros > 1
    if (numZeros === 1) output[firstZeroIndex] = product;
    else if (!numZeros) output[j] = product / currEl;
  });
  return output;
};

console.log(productExcludeAtIndex([])); // null
console.log(productExcludeAtIndex([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
console.log(productExcludeAtIndex([-1, 1, 0, -3, 3, 0])); // [0, 0, 0, 0, 0, 0]
console.log(productExcludeAtIndex([1, 2, 3, 4])); // [24, 12, 8, 6]
