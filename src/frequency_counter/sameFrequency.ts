/**
 * Write a function called sameFrequency. Given two positive integers, find out if the
 * two numbers have the same frequency of digits
 */

/**
 * Example: [182, 281] // true
 * Example: [] // null
 * Example: [1113, 1311] // true
 * Example: [233, 331] // false
 */

/**
 * initialize an object/hashtable to store frequencies of digits
 * iterate through the digits in the first integer and store frequencies
 * iterate throught the digits in the second integer and for each digit
 *  subtract one from the frequency. If the frequency is 0 then delete the entry or go through
 *  the the values of the frequencies obj at the end and return false if any of them aren't 0?
 */

const createDigitArray = (int: number): number[] => {
  const digits: number[] = [];
  // Note: positive integers means that int can't be 0
  while (int) {
    const temp: number = int;
    // eslint-disable-next-line no-param-reassign
    int = ((int / 10) >> 0);
    const digit: number = temp - (int * 10);
    digits.push(digit);
  }
  return digits;
};

const sameFrequency = (integers: number []): Boolean | null => {
  if (!integers.length) return null;
  const int1Digits = createDigitArray(integers[0]);
  const int2Digits = createDigitArray(integers[1]);
  const frequencies: { [key: string]: number } = {};

  // NOTE: you can combine the next two for loops
  for (let i = 0; i < int1Digits.length; i += 1) {
    const currDigit: number = int1Digits[i];
    if (frequencies[currDigit]) frequencies[currDigit] += 1;
    else (frequencies[currDigit] = 1);
  }

  for (let j = 0; j < int2Digits.length; j += 1) {
    const currDigit: number = int2Digits[j];
    if (frequencies[currDigit]) {
      frequencies[currDigit] -= 1;
    } else return false;
  }

  const frequenciesKeys = Object.keys(frequencies);
  for (let k = 0; k < frequencies.length; k += 1) {
    if (frequenciesKeys[k]) return false;
  }
  return true;
};

console.log(sameFrequency([182, 281])); // true
console.log(sameFrequency([])); // null
console.log(sameFrequency([1113, 1311])); // true
console.log(sameFrequency([233, 331])); // false
