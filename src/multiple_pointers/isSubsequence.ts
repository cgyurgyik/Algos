/**
 * Write a function called isSubsequence which takes in two strings and checks
 * whether the characters in the first string form a subsequence
 * of the characters in the second string. In other words, the function should
 * check whether the characters in the first string appear somewhere in the
 * second string, without their order changing.
 */

/**
 * Example: substring = 'can' string = 'tucatcanny'
 * O(N+M):
 * if second string length is smaller than first string length, return false
 * iterate through the second string and compare characters
 * make sure to stop checking as soon as characters diverge and set pointers appropriately
 *  if you find a match return true
 * return false
 */

const isSubsequence = (substring: string, string: string): Boolean => {
  if (string.length <= substring.length) return false;
  let pointer: number = 0;
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === substring[pointer]) {
      // check to see if we are at end of substring and everything matches
      if (pointer === substring.length - 1) return true;
      pointer += 1;
    } else {
      // reset the pointer for substring
      pointer = 0;
    }
  }
  return false;
};

console.log(isSubsequence('cat', 'cat')); // false
console.log(isSubsequence('can', 'tucatcanny')); // true
console.log(isSubsequence('nac', 'tucatcanny')); // false
console.log(isSubsequence('cat', 'tucatcanny')); // true
console.log(isSubsequence('', '')); // false
console.log(isSubsequence('can', 'ca')); // false
