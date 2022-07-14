/**
 * Counting Bits:
 * https://leetcode.com/problems/counting-bits/
 * Given an integer n, return an array ans of length n + 1 such that for each
 * i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Example 2:

Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

Constraints:

    0 <= n <= 105

Follow up:

    It is very easy to come up with a solution with a runtime of O(n log n).
    Can you do it in linear time O(n) and possibly in a single pass?
    Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?

    STRATEGY: Since the ints we are looking at are consecutive, we will go in order and calculate
    the number of ones in each binary representation of the integers. Caching these results will
    allow us to reuse them in larger problems. The basic insight is that each binary representation
    starts with finding the leading bit/the largest power of two that fits in i and then subtracting
    that number from i. Then the problem reduces to one additional 1 and a previously solved problem
 */

const countingBits = (n: number): Uint16Array => {
  // initialize a cache/result to store the number of ones in all consecutive integers up to n
  // the dynamic programming aspect might be clearer if you split the cache and the result array
  // but combining them is more memory efficient

  // the problem states the range of n. 10,000 fits into 16 bits, and using Uint16Array is more
  // memory efficient, apparently more CPU efficient and also initializes all elements to 0 which
  // we take advantage of
  const result: Uint16Array = new Uint16Array(n + 1);

  // iterate through each number starting at 1 (since log(0) is -Infinity and 0 has 0 ones in binary
  // which was taken care of by Uint16Array initializing elements to 0) and ending in n inclusive
  for (let i = 1; i < n + 1; i += 1) {
    // calculate largest power of two that fits into i using log2 (using logarithm change base rule)
    const largestPowerOfTwo: number = 2 ** (Math.floor(Math.log(i) / Math.log(2)));
    // calculate remainder of the current number (i) minus the largest power of two that fits in i
    const remainder: number = i - largestPowerOfTwo;
    // store the number of ones in the cache/result array. it's just 1 more than the cached result
    // of the subproblem aka result[remainder]
    result[i] = 1 + result[remainder];
  }
  return result;
};

const alternateCountingBits = (n: number): Uint16Array => {
  const result: Uint16Array = new Uint16Array(n + 1);
  for (let i = 1; i < n + 1; i += 1) {
    // eslint-disable-next-line no-bitwise
    result[i] = 1 + result[i ^ (1 << (31 - Math.clz32(i)))];
  }
  return result;
};

console.log(countingBits(0)); // expect [0]
console.log(countingBits(57)); // expect [0, 1, 1, 2, 1, 2, 2, 3, ..., 4]
console.log(alternateCountingBits(0)); // expect [0]
console.log(alternateCountingBits(57)); // expect [0, 1, 1, 2, 1, 2, 2, 3, ..., 4]
