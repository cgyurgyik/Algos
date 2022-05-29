/**
 * Given two strings, write a function to determine if the second string
 * is an anagram of the first. An anagram is defined as a word, phrase, or
 * name formed by rearranging the letters of another, such as cinema formed
 * from iceman
 */

// Note: if the first and second strings are equivalent they should
// be counted as anagrams. if both strings are empty strings they should
// be counted as anagrams as well. Only deal with alpha characters

const anagram = (str1: string, str2: string): Boolean => {
  // check to see if both strings have the same length which must be true for anagrams
  if (str1.length !== str2.length) return false;
  // iterate through the first string and cache its character frequencies in an object
  // do the same for the second string
  const str1Freq: { [key: string]: number } = {};
  const str2Freq: { [key: string]: number } = {};
  for (let i = 0; i < str1.length; i += 1) {
    const currChar1 = str1[i];
    const currChar2 = str2[i];
    // check if current char is already in the cache. if it is increment count
    // otherwise add kv pair to cache with value set to 1
    if (str1Freq[currChar1] !== undefined) str1Freq[currChar1] += 1;
    else (str1Freq[currChar1] = 1);
    if (str2Freq[currChar2] !== undefined) str2Freq[currChar2] += 1;
    else (str2Freq[currChar2] = 1);
  }
  // iterate throught the first char freq cache and compare frequencies of characters in the
  // second cache
  const frequencies = Object.entries(str1Freq);
  for (let j = 0; j < frequencies.length; j += 1) {
    const currChar = frequencies[j][0];
    const currFreq = frequencies[j][1];
    // if something doesn't match up then return false
    if (str2Freq[currChar] !== currFreq) return false;
  }
  // if at the end of your iteration you have not returned false, return true
  return true;
};

const anagram2 = (str1: string, str2: string): Boolean => {
  // check lengths match
  if (str1.length !== str2.length) return false;
  // construct cache
  const str1Freq: { [key: string]: number } = {};
  for (let i = 0; i < str1.length; i += 1) {
    const currChar = str1[i];
    if (str1Freq[currChar]) str1Freq[currChar] += 1;
    else str1Freq[currChar] = 1;
  }
  // compare with other string
  for (let j = 0; j < str2.length; j += 1) {
    const currChar = str2[j];
    if (!str1Freq[currChar]) return false;
    // NOTE: this works because the strings are guaranteed to be the same length
    str1Freq[currChar] -= 1;
  }
  return true;
};

console.log(anagram('', '')); // true
console.log(anagram('samesies', 'samesies')); // true
console.log(anagram('arst', 'arrest')); // false
console.log(anagram('taser', 'sat')); // false
console.log(anagram('taser', 'arest')); // true
console.log(anagram('taser', 'taasserr')); // false

console.log(anagram2('awesome', 'awesom')); // false
