/**
 * Base Case:
 * When the length of the array is less than 2 in which case return array
 * Recursive Case:
 * Choose random pivot
 * Partition array into less, equal, greater
 * Return [quicksort(less), equal, pivotVal, quicksort(greater)]
 */

const partition = (
  arr: number[],
  pivot: number,
  less: number[],
  equal: number[],
  greater: number[],
) => {
  // Iterate through array and fill 3 subarrays
  for (let i = 0; i < arr.length; i += 1) {
    // skip pivot
    if (i !== pivot) {
      const currEl: number = arr[i];
      const pivotVal: number = arr[pivot];
      if (currEl > pivotVal) greater.push(currEl);
      else if (currEl < pivotVal) less.push(currEl);
      else equal.push(currEl);
    }
  }
};

const quicksort = (arr: number[]): number[] => {
  // Base Case:
  if (arr.length < 2) return arr;
  // Recursive Case:
  // Initialize subarrays
  const less: number[] = [];
  const equal: number[] = [];
  const greater: number[] = [];
  // Partition array into subarrays
  // NOTE: this is random quicksort which is guaranteed a O(n logn)
  const pivot: number = Math.floor((Math.random() * arr.length));
  partition(arr, pivot, less, equal, greater);
  return [...quicksort(less), ...equal, arr[pivot], ...quicksort(greater)];
};

console.log(quicksort([])); // []
console.log(quicksort([2, 1])); // [1, 2]
console.log(quicksort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]
console.log(quicksort([54, 6, -2, 0])); // [-2, 0, 6, 54]
console.log(quicksort([0, 4, 0, 5, 4])); // [0, 0, 4, 4, 5]
