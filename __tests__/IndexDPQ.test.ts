/* eslint-disable max-len */
import { describe, expect, it } from '@jest/globals';
import { IndexDPQ, Comparable } from '../src/data_structures/IndexDPQ';


// TODO: test very large values for D, and huge arrays and such
// TODO: thin about mixing generic types (nothing in the transpiled code would
// prevent this right?)
/* --------------------------------- numbers -------------------------------- */
describe('tests for a ternary max IPQ that starts empty with valid initial'
+ 'array size that works with type number', () => {
  const ipq3MaxEmpty2 = new IndexDPQ<number>({
    D: 3,
    max: true,
    initialArraysSize: 2,
  });
  it(
    'should let us insert number items while maintaining the heap invariant',
    () => {
      ipq3MaxEmpty2.insert(4);
      ipq3MaxEmpty2.insert(-4);
      ipq3MaxEmpty2.insert(12);
      ipq3MaxEmpty2.insert(10);
      ipq3MaxEmpty2.insert(56);
      ipq3MaxEmpty2.insert(3);
      ipq3MaxEmpty2.insert(4);
      ipq3MaxEmpty2.insert(-1);
      ipq3MaxEmpty2.insert(23);

      // expect(ipq3MaxEmpty2.items).toEqual(
      //   [null, 4, -4, 12, 10, 56, 3, 4, -1, 23, null, null, null, null, null, null],
      // );
      // expect(ipq3MaxEmpty2.pq).toEqual(
      //   [-1, 5, 3, 9, 4, 2, 6, 7, 8, 1, -1, -1, -1, -1, -1, -1],
      // );
      // expect(ipq3MaxEmpty2.qp).toEqual(
      //   [-1, 9, 5, 2, 4, 1, 6, 7, 8, 3, -1, -1, -1, -1, -1, -1],
      // );
    },
  );
});

// const ipq3MinEmpty1 = new IndexPQ({
//   D: 3,
//   max: false,
//   initialArraysSize: 1,
// });

// const ipq0MinEmpty32 = new IndexPQ({
//   D: 0,
//   max: false,
//   initialArraysSize: 32,
// });

// const ipq3MaxSeededGeneral = new IndexPQ({
//   D: 3,
//   max: true,
//   array: [4, -4, 12, 10, 56, 3, 4, -1, 23],
// });
// /* --------------------------- generic independent -------------------------- */
// const ipq4MinSeededEmpty = new IndexPQ({
//   D: 4,
//   max: true,
//   array: [],
// });
// /* -------------------------- invalid construction -------------------------- */
// /* ---------------------------- very large values --------------------------- */
// it('should find the last internal node (last non-lead node'
//     + 'in tree)', () => {

// });
