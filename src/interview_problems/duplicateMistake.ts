// The input nums is supposed to be an array of unique integers ranging from 1 to nums.length
// (inclusive). However, there is a mistake: one of the numbers in the array is duplicated,
// which means another number is missing.

// Find and return the sum of the duplicated number and the missing number.

// Example: in the array [4, 3, 3, 1], 3 is present twice and 2 is missing,
// so 3 + 2 = 5 should be returned.
// NOTE: array not guaranteed to be sorted
// [4,5,6,1,2,10,9,7,8,9] should return 9 + 3 = 12
// generate object with all numbers 1 to length
// set all their values to 0
/**
 * check array length: 10
 * go through array once to update counts
 * {
 * 1: 1,
 * 2: 1,
 * 3: 0,
 * 4: 1,
 * 5: 1,
 * 6: 1,
 * 7: 1,
 * 8: 1,
 * 9: 2,
 * 10: 1
 * }
 *
 * iterate through array again:
 * look up current element in hashtable
 * if present delete (O(1)) property
 * you should be left with
 * {
 *  3: 0,
 *  9: 2
 * }
 * iterate through keys of object. Add to result and return
 */

// sorted: [1, 2, 4, 5, 6, 7, 8, 9, 9, 10]

const duplicateMistake = (array: number []): number => {
  // initialize result variable to 0
  // initialize object with counts
  // return result
}
