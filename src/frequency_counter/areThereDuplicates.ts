/**
 * Implement a function called, areThereDuplicates which accepts a variable
 * number of arguments, and checks whether there are any duplicates amongst
 * the arguments passed in. You can solve this using the frequency counter pattern
 * or the multiple pointers pattern.
 */

// frequency counter solution
// NOTE: you could just convert the array to a set and then compare lengths

/**
 * intialize a hash table/object to store the frequencies of the arguments
 * iterate through the arguments array and populate the frequencies object with
 * counts
 * once the frequencies object is populated, iterate through the values and check that none of them
 * are greater than 1
 * NOTE: deal with types by concatenating typeOf results to key
 */

type toStringable = number | Boolean | string;

const areThereDuplicatesFC = (...args: toStringable[]): Boolean | null => {
  if (!args.length) return null;
  const frequencies: { [key: string]: number } = {};
  for (let i = 0; i < args.length; i += 1) {
    const currArg: toStringable = args[i];
    const currKey: string = `${currArg.toString()}${typeof currArg}`;
    if (!frequencies[currKey]) frequencies[currKey] = 1;
    else return true;
  }
  return false;
};

// multiple pointers solution
/**
 * [1, 2, 3, 1]
 * [1, 1, 2, 3]
 * sort the array O(nlogn) (sorting strings )
 * set one pointer to point to the first element and one to the second
 * compare values, if they are the same then return true otherwise move
 * pointers
 */

// const areThereDuplicatesMP = (...args: toStringable[]): Boolean | null => {
//   if (!args.length) return null;


// };


console.log(areThereDuplicatesFC(1, 2, 3, 1)); // true
console.log(areThereDuplicatesFC()); // null
console.log(areThereDuplicatesFC(1, 2, 3, '1')); // false
console.log(areThereDuplicatesFC(1, 2, 3)); // false
console.log(areThereDuplicatesFC('a', 2, true)); // false
