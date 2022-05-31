/**
 * countUniqueValues
 * Implement a function called countUniqueValues,
 * which accepts a sorted array, and counts the unique values
 * in the array. There can be negative numbers in the array,
 * but it will always be sorted
 */

const countUniqueValues = (sortedInts: number[]): number => {
  // explicitly deal with empty array
  if (!sortedInts.length) return 0;
  // initiate a counter variable to 1
  let uniqueCount = 1;
  // set first pointer to 0th index
  let first = 0;
  // set second pointer to 1st index
  let second = 1;
  // while the second pointer value is defined
  while (sortedInts[second] !== undefined) {
    // if firstVal and secondVal are different increment counter
    // and move first pointer to second pointer and increment second pointer after
    if (sortedInts[first] !== sortedInts[second]) {
      uniqueCount += 1;
      first = second;
      second += 1;
      // otherwise, increment second pointer
    } else second += 1;
  }
  return uniqueCount;
};

// const countUniqueValuesModArray = (sortedInts: number[]): number => {
//   if (!sortedInts.length) return 0;
//   let first = 0;
//   let second = 1;
//   while (sortedInts[second] !== undefined) {
//     if (sortedInts[first] !== sortedInts[second]) {
//       sortedInts[first] = first + 1;
//       first += 1;
//     }
//     second += 1;
//   }
//   return sortedInts[first - 1] + 1;
// };

const countUniqueValuesModArray = (sortedInts: number[]): number => {
  if (!sortedInts.length) return 0;
  let first = 0;
  for (let second = 0; second < sortedInts.length; second += 1) {
    if (sortedInts[first] !== sortedInts[second]) {
      first += 1;
      sortedInts[first] = sortedInts[second];
    }
  }
  return first + 1;
};

/**
 * first: 0
 * second: 1
 * counter: 0
 * -1 !=== 1
 * counter: 1
 * first: 1
 * second: 2
 * 1 === 1
 * counter: 1
 * first: 1
 * second: 3
 * 1 === 1"
 * counter: 1
 * first: 1
 * second: 4
 * 1 !== 2
 * counter: 2
 * first: 4
 * second: 5
 */
console.log(countUniqueValues([-1, 1, 1, 1, 2])); // 3
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([1, 2, 3, 3, 4])); // 4
console.log(countUniqueValuesModArray([-1, 1, 1, 1, 2])); // 3
console.log(countUniqueValuesModArray([])); // 0
console.log(countUniqueValuesModArray([1, 2, 3, 3, 4])); // 4
