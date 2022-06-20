/**
 * selectionSort
 * sort through an array of integers by iterating
 * through the array and finding the max value
 * which you add to an empty array and remove from the original array
 */

/**
 * @param array of numbers
 * @returns index of largest number in array
 * @note will return -1 as an index if the array is empty which shouldn't happen
 * @example array = [2, -4, 4, 6, 10] should return 4 because the element at index 4 is the max
 */
const findMax = (array: number[]): number => {
  if (!array.length) return -1;
  let maxIndex = 0;
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] > array[maxIndex]) maxIndex = i;
  }
  return maxIndex;
};

/**
 * @param array of numbers
 * @returns sorted array
 * @note empty array should return an empty array
 * @example array = [2, -4, 4, 6, 10] should return [10, 6, 4, 2, -4]
 */
const selectionSort = (array: number[]): number[] => {
  if (array.length < 2) return array;
  const sorted: number[] = new Array<number>(array.length);
  // save original array length before splicing occurs
  const arrayLength: number = array.length;
  for (let i = 0; i < arrayLength; i += 1) {
    const maxIndex: number = findMax(array);
    sorted[i] = array[maxIndex];
    array.splice(maxIndex, 1);
    console.log(`array: ${array}`);
  }
  return sorted;
};

console.log(selectionSort([2, -4, 4, 6, 10])); // return [10, 6, 4, 2, -4]
console.log(selectionSort([])); // return []
