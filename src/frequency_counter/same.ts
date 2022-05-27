/**
 * Write a function called same, which accepts two arrays. The
 * function should return true if every value in the array has
 * it's corresponding value squared in the second array. The frequency
 * of the values should remain the same.
 */
// Note frequency has to be the same so [1, 2, 1] and [4, 4, 1] should return false

const same = (arr1: number[], arr2: number[]): Boolean => {
  // check if lengths of arr1 and arr2 are the same
  // (they have to match and checking outright is easier)
  if (!(arr1.length === arr2.length)) return false;
  // setup two hash tables/objects to track the frequency of each number in
  // arr1 and then each frequency of arr2's elements
  const arr1Freq: {[key: number]: number} = {};
  const arr2Freq: {[key: number]: number} = {};
  for (let i = 0; i < arr1.length; i += 1) {
    const curr1 = arr1[i];
    const curr2 = arr2[i];
    // if arr1Freq[curr] does not not exist add the kv pair to the object with value 1
    // otherwise increment value
    if (arr1Freq[curr1] !== undefined) arr1Freq[curr1] += 1;
    else arr1Freq[curr1] = 1;
    // do the same for arr2Freq since the length is the same we can use the same loop
    if (arr2Freq[curr2] !== undefined) arr2Freq[curr2] += 1;
    else arr2Freq[curr2] = 1;
  }
  // iterate throught the elements in the first frequency object and check to see
  // if the element squared exists and has the same frequency in the second object
  const frequencies = Object.entries(arr1Freq);
  for (let j = 0; j < frequencies.length; j += 1) {
    const curr = frequencies[j];
    if (arr2Freq[parseInt(curr[0], 10) ** 2] !== curr[1]) return false;
  }
  // if it does not then return false
  // if it does return true and remove the element from the second frequency object
  return true;
};

console.log(same([1, 2, 3], [4, 1, 9])); // true
console.log(same([1, 2, 3], [1, 9])); // false
console.log(same([1, 2, 1], [4, 4, 1])); // false
console.log(same([1, 2, 3, 2], [4, 9, 4, 1])); // true
console.log(same([1, 2, 3, 2], [4, 4, 1, 0])); // false
console.log(same([1, 2, 3, 2], [4, 9])); // false
