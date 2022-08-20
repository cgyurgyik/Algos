/* eslint-disable max-len */
import { describe, expect, it } from '@jest/globals';
import { IndexDPQ, Comparable } from '../data_structures/IndexDPQ';

class testComparable {
  private name: string;

  private v2: Uint32Array;

  private donation: number;

  constructor(name: string, v2: Uint32Array, donation: number) {
    this.name = name;
    this.v2 = v2;
    this.donation = donation;
  }

  private calculateScore(): number {
    return (this.name[0] ? this.name.charCodeAt(0) * this.donation + this.v2[0] - this.v2[1] : 0);
  }

  public isLessThan(x: testComparable): boolean {
    return (this.calculateScore() < x.calculateScore());
  }

  public isLooselyEqual(x: testComparable): boolean {
    // eslint-disable-next-line eqeqeq
    return (this == x);
  }

  public isStrictlyEqual(x: testComparable): boolean {
    return (this === x);
  }
}

// TODO: test very large values for D, and huge arrays and such
// TODO: think about mixing generic types (nothing in the transpiled code would
// prevent this right?)
/* --------------------------------- numbers -------------------------------- */
describe('tests for a ternary max IPQ that starts empty with valid initial'
+ ' array size that works with type number', () => {
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
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 4, -4, 12, 10, 56, 3, 4, -1, 23, null, null, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 5, 3, 9, 4, 2, 6, 7, 8, 1, -1, -1, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 9, 5, 2, 4, 1, 6, 7, 8, 3, -1, -1, -1, -1, -1, -1],
      );
    },
  );
  it(
    'should return false when we ask if it is empty when it is not',
    () => {
      expect(ipq3MaxEmpty2.isEmpty()).toBe(false);
    },
  );
  it(
    'should return the root when we ask for it',
    () => {
      expect(ipq3MaxEmpty2.root()).toBe(56);
    },
  );
  it(
    'should maintain the heap invariant as root is deleted and return the root Item.',
    () => {
      /* ------------------------------ first delete ------------------------------ */
      let deletedRoot: (number | null) = ipq3MaxEmpty2.deleteRoot();
      expect(deletedRoot).toBe(56);
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 4, -4, 12, 10, 23, 3, 4, -1, null, null, null, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 5, 3, 1, 4, 2, 6, 7, 8, -1, -1, -1, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 3, 5, 2, 4, 1, 6, 7, 8, -1, -1, -1, -1, -1, -1, -1],
      );
      /* ------------------------------ second delete ----------------------------- */
      deletedRoot = ipq3MaxEmpty2.deleteRoot();
      expect(deletedRoot).toBe(23);
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 4, -4, 12, 10, -1, 3, 4, null, null, null, null, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 3, 7, 1, 4, 2, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 3, 5, 1, 4, 7, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      /* ------------------------------ third delete ------------------------------ */
      deletedRoot = ipq3MaxEmpty2.deleteRoot();
      expect(deletedRoot).toBe(12);
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 4, -4, 4, 10, -1, 3, null, null, null, null, null, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 4, 3, 1, 5, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 3, 5, 2, 1, 4, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      /* ------------------------------ fourth delete ----------------------------- */
      deletedRoot = ipq3MaxEmpty2.deleteRoot();
      expect(deletedRoot).toBe(10);
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 4, -4, 4, 3, -1, null, null, null, null, null, null, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 3, 4, 1, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 3, 5, 1, 2, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      /* ------------------------------ fifth delete ------------------------------ */
      deletedRoot = ipq3MaxEmpty2.deleteRoot();
      expect(deletedRoot).toBe(4);
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 4, -4, -1, 3, null, null, null, null, null, null, null, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 1, 4, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 1, 3, 4, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      );
      /* ------------------------------ sixth delete ------------------------------ */
      deletedRoot = ipq3MaxEmpty2.deleteRoot();
      expect(deletedRoot).toBe(4);
      console.log(ipq3MaxEmpty2.getNumItems());
      console.log(ipq3MaxEmpty2.getItems());
      expect(ipq3MaxEmpty2.getItems()).toEqual(
        [null, 3, -4, -1, null, null, null, null],
      );
      expect(ipq3MaxEmpty2.getHeap()).toEqual(
        [-1, 1, 3, 2, -1, -1, -1, -1],
      );
      expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
        [-1, 1, 3, 2, -1, -1, -1, -1],
      );
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
