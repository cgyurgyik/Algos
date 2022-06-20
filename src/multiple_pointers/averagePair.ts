/**
 * Write a function called averagePair. Given a sorted array of integers and a target
 * average, determine if there is a pair of values in the array where the average
 * of the pair equals the target average. There may be more than one pair that matches
 * the average target.
 */

/**
 * [1, 2, 3, 4, 5] target: 3
 * [-3, -1, 1, 1, 4, 7] target: 3
 * intialize pointers to the 0th and last index
 * add and average the values at those pointers and compare them to the target
 * if the result is larger than the target then decrement the second pointer
 * if the result is smaller than the target then increment the first pointer
 * if the first and the second pointer are equal then no pair matches the target
 */

const averagePair = (array: number[], target: number): Boolean | null => {
  if (!(array.length > 1)) return null;
  let firstPointer: number = 0;
  let secondPointer: number = array.length - 1;

  while (firstPointer !== secondPointer) {
    const firstVal: number = array[firstPointer];
    const secondVal: number = array[secondPointer];
    const average: number = (firstVal + secondVal) / 2;
    if (average < target) firstPointer += 1;
    else if (average > target) secondPointer -= 1;
    else return true;
  }
  return false;
};

console.log(averagePair([1, 2, 3, 4, 5], 2.5)); // return true
console.log(averagePair([-3, -1, 0, 3, 3, 4, 5], -0.5)); // return true
console.log(averagePair([], 2.5)); // return null
console.log(averagePair([1, 2, 3, 4, 5], 3)); // return true
console.log(averagePair([1, 2, 3, 4, 5], 8)); // return false
