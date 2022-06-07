/**
* Given a sorted array of ints dedupe in place
* https://leetcode.com/problems/remove-duplicates-from-sorted-array/
*/
// O(n^2)
const deleteCustom = (arr: number[], deleteIndex: number): void => {
  // iterate, copy over
  for (let i = deleteIndex; i < arr.length - 1; i += 1) {
    arr[i] = arr[i + 1];
  }
  // pop the last number that will be a duplicate
  arr.pop();
};

// initialize two pointers
// iterate through arr checking if value at second pointer equals
// value at first pointer
  // if they are equal, then delete value at second pointer
  // else move the first pointer to the second pointer then the second pointer
  // to the next element (make sure it's in bounds)
// return array
const removeDuplicates = (arr: number[]): number[] => {
  let first: number = 0;
  for (let second = 1; second < arr.length; second += 1) {
    if (arr[second] === arr[first]) {
      deleteCustom(arr, second);
      second -= 1;
    } else first = second;
  }
  return arr;
};

const nums0: number[] = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const nums1: number[] = [];
const nums2: number[] = [1];
const nums3: number[] = [1, 1, 2];

console.log(removeDuplicates(nums0));
console.log(removeDuplicates(nums1));
console.log(removeDuplicates(nums2));
console.log(removeDuplicates(nums3));
