/**
 * You are given a 2D array of potentially unequal height and width
 * containing only 0s and 1s. Each 0 represents land and each 1 represents
 * part of a river. A river consists of any number of 1s that are either horizontally
 * or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming
 * a river determines its size.
 *
 * NOTE: A river can twist. i.e. doesn't have to be a straight line (e.g. L shaped)
 *
 * Write a function that returns an array of the sizes of all rivers represented
 * in the input matrix. The sizes don't need to be in a particular order.
 *
 * NOTE: it was not clear to me how branching rivers are supposed to be counted, so
 * I am trying to count them as separate rivers
 *
 * i.e.
 * M = [
 * [0 1 0],
 * [1 1 0],
 * [0 1 1]
 * ]
 *
 * should in my version of this problem, return [4, 3] and not [5]
*/
type RiversOrLand = 0 | 1;

const riverSizes = (M: RiversOrLand[][]): number[] => {
  // check if matrix has valid lengths
  if (!M[0].length) {
    console.log('pleases enter valid matrix');
    return [];
  }

  // retain all previously checked river elements in cache to
  // avoid checking them repeatedly
  const cache: {[key: number]: 1} = {};
  // we will be creating unique keys for the cache by calculating
  // key = i*q + j where q > j. This is a trick for combining two values
  // into one in such a way that they can be separated using mod q and integer
  // division by q
  const q = M[0].length;

  const sizes: number[] = [];
  // define recursive function that will follow a river recursively and return
  // an array of sizes for that river (multiple in the case of branching)
  const findRivers = (i: number, j: number, sizeCounter: number = 1): void => {
    const maxi: number = M.length - 1;
    const maxj: number = M[0].length - 1;
    // foundAdjacent default 0; up 1; down: 2; left: 3; right: 4
    let foundAdjacent = 0;
    
    // Recursive Cases:
    // Up is in bounds and a 1 and uncached
    if ((i - 1 >= 0) && M[i - 1][j] && !cache[(i - 1) * q + j]) {
      cache[(i - 1)*q + j] = 1;  
      foundAdjacent = 1;
      findRivers(i - 1, j, sizeCounter + 1);
    }
    // Down is in bounds and a 1 and uncached
    if ((i + 1 <= maxi) && M[i + 1][j] && !cache[(i + 1) * q + j]) {
      cache[(i + 1)*q + j] = 1;
      foundAdjacent = 2;
      findRivers(i + 1, j, sizeCounter + 1);
    }
    // Left is in bounds and a 1 and uncached
    if ((j - 1) >= 0 && M[i][j - 1] && !cache[i * q + (j - 1)]) {
      cache[i*q + (j - 1)] = 1;
      foundAdjacent = 3;
      findRivers(i, j - 1, sizeCounter + 1);
    }
    // Right is in bounds and a 1 and uncached
    if ((j + 1) <= maxj && M[i][j + 1] && !cache[i * q + (j + 1)]) {
      cache[i*q + (j + 1)] = 1;
      foundAdjacent = 4;
      findRivers(i, j + 1, sizeCounter + 1);
    }
    // Base Case: No valid river elements adjacent
    if (!foundAdjacent) sizes.push(sizeCounter);
    return;
  };

  for (let i = 0; i < M.length; i++) {
    for (let j = 0; j < M[0].length; j++) {
      // check if current element is an uncached river element
      if (M[i][j] && !cache[i * q + j]) {
        // cache new river element
        cache[(i * q) + j] = 1;
        // add river sizes to results array
        findRivers(i, j);
      }
    }
  }
  return sizes;
};
console.log(riverSizes([
  [0, 1, 0],
  [1, 1, 0],
  [0, 1, 1]
])); // [4, 3]
// NOTE: THIS EXAMPLE SHOWS THAT THE PROBLEM WAS POORLY DEFINED AND BRANCHING
// IS DEPENDENT ON ORDER OF IF STATEMENTS!
console.log(riverSizes([
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 0, 0, 1, 1]
])); // [2, 2, 5, 3, 4]
console.log(riverSizes([
  [1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0]
])); // [3, 2, 1]
