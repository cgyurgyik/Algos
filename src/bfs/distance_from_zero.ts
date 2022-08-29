type zeroOneMatrix = (0 | 1) [][];
// TODO: figure out time complexity (O(m*n*numberof1s*BFSCost))
const distanceFromZero = (mat: zeroOneMatrix): number[][] | number[] => {
  const numRows: number = mat.length;
  // TODO: better way to do this check?
  let numCols: number = 0;
  if (numRows) {
    numCols = mat[0].length;
  } else {
    throw new Error('ERROR: input cannot be empty!');
  }
  if (!numCols) return mat;
  // TODO: better way to do this?
  const result = Array(numRows).fill([]).map(() => Array(numCols));

  // NOTE: unecessary level of complexity but its a fun trick
  const generateKey = (i: number, j: number): number => ((i * numCols) + j);
  // NOTE: doesn't even get used, but you can go back from key to indices
  // eslint-disable-next-line max-len
  // const generateIndices = (key: number): [i: number, j: number] => [Math.floor(key / numCols), key % numCols];
  function assertNonNullish<TValue>(
    value: TValue,
    message: string,
  ): asserts value is NonNullable<TValue> {
    if (value === null || value === undefined) {
      throw Error(message);
    }
  }

  const BFSCost = (i: number, j: number): number => {
    const cost: number = 0;
    // TODO: how would i cache with an array?
    const cache: { [key: number]: (0 | 1) } = {};
    const queue: [[i: number, j: number, level: number]] = [[i, j, 0]];

    while (queue.length) {
      // TODO: is there a way to avoid shifting?
      const currEl = queue.shift();
      // TODO: currEl should be defined because of queue.length check
      // how do i avoid this additional check?
      assertNonNullish(currEl, 'ERROR: currIndices undefined or null!');
      const curri: number = currEl[0];
      const currj: number = currEl[1];
      const currVal: (0 | 1) = mat[curri][currj];
      const level: number = currEl[2];
      if (currVal === 0) return level;
      // LEFT
      if (currj - 1 >= 0) {
        const leftKey = generateKey(curri, currj - 1);
        if (!cache[leftKey]) {
          cache[leftKey] = 1;
          queue.push([curri, currj - 1, level + 1]);
        }
      }
      // RIGHT
      if (currj + 1 < numCols) {
        const rightKey = generateKey(curri, currj + 1);
        if (!cache[rightKey]) {
          cache[rightKey] = 1;
          queue.push([curri, currj + 1, level + 1]);
        }
      }
      // UP
      if (curri - 1 >= 0) {
        const upKey = generateKey(curri - 1, currj);
        if (!cache[upKey]) {
          cache[upKey] = 1;
          queue.push([curri - 1, currj, level + 1]);
        }
      }
      // DOWN
      if (curri + 1 < numRows) {
        const downKey = generateKey(curri + 1, currj);
        if (!cache[downKey]) {
          cache[downKey] = 1;
          queue.push([curri + 1, currj, level + 1]);
        }
      }
    }
    // No 0s present (matrix full of 1's)
    return Infinity;
  };

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const currVal: (0 | 1) = mat[i][j];
      if (!currVal) result[i][j] = 0;
      else result[i][j] = BFSCost(i, j);
    }
  }
  return result;
};

const testMat1: zeroOneMatrix = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
// Expect [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
console.log(distanceFromZero(testMat1));
const testMat2: zeroOneMatrix = [[0, 0, 0], [0, 1, 0], [1, 1, 1]];
// Expect [[0, 0, 0], [0, 1, 0], [1, 2, 1]]
console.log(distanceFromZero(testMat2));
