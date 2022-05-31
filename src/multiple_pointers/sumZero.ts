/**
 * sumZero
 * Write a function named sumZero which accepts a sorted array
 * of integers. The function should find the first pair of integers
 * where the sum is 0. Return an array that returns both values that
 * sum up to 0 or undefined if such a pair does not exist.
 */

/**
 * Examples:
 * [-3, -2, -1, 2, 3, 4] -> [-3, 3]
 * [-2, -1, 0, 4, 5] -> undefined
 * [] -> undefined
 */

// O(n)
const sumZeroFirstDraft = (sortedInts: number[]): number[] | undefined => {
  // check if integer array is empty
  if (!sortedInts.length) return undefined;
  // given that the array is sorted and we're looking for a pair have two pointers
  // one pointer initially points to the beginning of the array and the other to the end
  let firstPointer = 0;
  let secondPointer = sortedInts.length - 1;
  // iterate through the array
  for (let i = 0; i < secondPointer; i += 1) {
    // take the value at the first pointer and add it to value at the second pointer
    const firstVal = sortedInts[firstPointer];
    const secondVal = sortedInts[secondPointer];
    const sum = firstVal + secondVal;
    // if the firstPointer and secondPointer are pointing to the same index, there is no pair
    if (firstPointer === secondPointer) return undefined;
    // if the resulting sum is greater than 0 move the second pointer to the previous index (left)
    if (sum > 0) {
      secondPointer -= 1;
    }
    // if the resulting sum is 0 return the pair
    else if (sum === 0) {
      return [firstVal, secondVal];
    }
    // if the result is less than 0, move the first pointer to the next index (right)
    else {
      firstPointer += 1;
    }
  }
};

const sumZero = (sortedInts: number[]): number[] | undefined => {
  let firstPointer = 0;
  let secondPointer = sortedInts.length - 1;
  while (firstPointer < secondPointer) {
    const firstVal = sortedInts[firstPointer];
    const secondVal = sortedInts[secondPointer];
    const sum = firstVal + secondVal;
    if (sum > 0) secondPointer -= 1;
    else if (sum < 0) firstPointer += 1;
    else return [firstVal, secondVal];
  }
  return undefined;
};

console.log(sumZero([-3, -2, -1, 2, 3, 4])); // [-3, 3]
console.log(sumZero([-2, -1, 0, 4, 5])); // undefined
console.log(sumZero([])); // undefined
console.log(sumZero([-25, -2, 0, 2, 3])); // [-2, 2]
console.log(sumZero([0, 0])); // [0, 0]
console.log(sumZero([-4, -3, -2, -1, 0, 5, 10])); // undefined
