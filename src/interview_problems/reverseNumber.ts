/**
 * Reverse Number
 * negatives
 * decimals
 * no stringifying allowed
 */

/**
 * Example 1:
 * 12 EXPECT 21
 * Example 2:
 * -12 EXPECT -21
 * Example 3:
 * 0 EXPECT 0
 * Example 4:
 * 120 EXPECT 21
 * Example 5:
 * 12.34 EXPECT 43.21
 * Example 6:
 * -12.34 EXPECT -43.21
 */

const reverseNumber = (num: number): number => {
  /**
   * Determine whether num is positive or negative and turn num positive to avoid
   * having to deal with taking log of a negative number
   */
  const sign: number = num >= 0 ? 1 : -1;
  // copy num for linting standard/generally to avoid side effects
  let numCopy: number = num;
  numCopy = Math.abs(numCopy);
  /**
   * Deal with decimals by storing the number of decimal places and multiplying
   * by 10 until there are no more decimals
   */
  let decimalPlaces: number = 0;
  while (numCopy !== Math.floor(numCopy)) {
    numCopy *= 10;
    decimalPlaces += 1;
  }
  /**
   * Now split num into digits that are stored in reverse order in an array
   * Deal with num = 0, in which case you want to avoid all the other logic and return 0
   */
  const numDigits: number = numCopy ? Math.floor(Math.log10(numCopy)) + 1 : 0;
  const reverse = new Array(numDigits);
  for (let i = 0; i < numDigits; i += 1) {
    // integer divide by 10 then multiply by 10 and subtract. Like bitshifting in base 10
    const shifted: number = Math.floor(numCopy / 10);
    reverse[i] = numCopy - (shifted * 10);
    numCopy = shifted;
  }
  // Now construct integer representation of recerse array
  let result: number = 0;
  for (let j = 0; j < reverse.length; j += 1) {
    // Grab current digit, multiply it by appropriate power of 10 and add to result
    const exponent: number = reverse.length - j - 1;
    result += reverse[j] * (10 ** exponent);
  }
  // Reintroduce the sign and decimals
  return (result / (10 ** decimalPlaces)) * sign;
};

// TESTS:
console.log(reverseNumber(12)); // 21
console.log(reverseNumber(-12)); // -21
console.log(reverseNumber(0)); // 0
console.log(reverseNumber(120)); // 21
console.log(reverseNumber(12.34)); // 43.21
console.log(reverseNumber(-12.34)); // -43.21
