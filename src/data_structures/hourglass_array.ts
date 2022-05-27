/*
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

// const ARRAY_LENGTH = 6;
const HOURGLASS_WIDTH = 3;
function hourglassSum(arr: number[][]): number {
  // keep track of maximum sum of hourglass
  let maxSum: number = -Infinity;
  // find the number of times the hourglass fits inside the array (per
  // dimension)
  const iterations: number = (arr.length - HOURGLASS_WIDTH) + 1;
  // loop through the array moving the hourglass checking zone as you go
  for (let i: number = 0; i < iterations; i += 1) {
    for (let j: number = 0; j < iterations; j += 1) {
      /**
       * HOURGLASS SUM
       * (i,j) + (i, j+1) + (i, j+2)
       * + (i+1, j+1)
       * + (i+2, j) + (i+2, j+1) + (i+2, j+2)
       */
      const currentSum = arr[i][j] + arr[i][j + 1] + arr[i][j + 2]
        + arr[i + 1][j + 1] + arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];

      if (maxSum < currentSum) {
        maxSum = currentSum;
      }
    }
  }
  return maxSum;
}

export default hourglassSum;
