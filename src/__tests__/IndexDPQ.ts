/* eslint-disable max-len */
import { describe, expect, it } from '@jest/globals';
import {
  IndexDPQ, Comparable, INDEX_TOO_LOW, NO_ROOT_TO_DELETE, NO_ROOT, NO_ITEM_TO_CHANGE, INDEX_TOO_HIGH,
} from '../data_structures/IndexDPQ';

class TestItem {
  private name: string;

  private v2: Uint32Array;

  private donation: number;

  constructor(name: string, v2: Uint32Array, donation: number) {
    this.name = name;
    this.v2 = v2;
    this.donation = donation;
  }

  public clone(): TestItem {
    return new TestItem(this.name, this.v2, this.donation);
  }

  private calculateScore(): number {
    return (this.name[0] ? this.name.charCodeAt(0) * this.donation + this.v2[0] - this.v2[1] : 0);
  }

  public isLessThan(x: TestItem): boolean {
    return (this.calculateScore() < x.calculateScore());
  }

  public isLooselyEqual(x: TestItem): boolean {
    // eslint-disable-next-line eqeqeq
    return (this == x);
  }

  public isStrictlyEqual(x: TestItem): boolean {
    return (this === x);
  }
}

// TODO: test very large values for D, and huge arrays and such
// TODO: think about mixing generic types (nothing in the transpiled code would
// prevent this right?)
/* --------------------------------- numbers -------------------------------- */
describe('tests for a ternary max IPQ that starts empty with valid initial'
+ ' array size that works with type number', () => {
  const props = {
    D: 3,
    max: true,
    initialNumberOfItems: 2,
  };
  const ipq3MaxEmpty2 = new IndexDPQ<number>(props);
  it('should have an items array consisting of initialNumberOfItems + 1 nulls', () => {
    const emptyItems = new Array(props.initialNumberOfItems + 1).fill(null);
    expect(ipq3MaxEmpty2.getItems()).toEqual(emptyItems);
  });
  it('should have a heap consisting of initialNumberOfItems + 1 -1s', () => {
    const emptyHeap = new Array(props.initialNumberOfItems + 1).fill(-1);
    expect(ipq3MaxEmpty2.getHeap()).toEqual(emptyHeap);
  });
  it('should have an inverse map consisting of initialNumberOfItems + 1 -1s', () => {
    const emptyInverseMap = new Array(props.initialNumberOfItems + 1).fill(-1);
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(emptyInverseMap);
  });
  it('should let us insert number items while maintaining the heap invariant', () => {
    ipq3MaxEmpty2.insert(4);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, -1],
    );
    ipq3MaxEmpty2.insert(-4);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, 2],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, 2],
    );
    ipq3MaxEmpty2.insert(12);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 3, 2, 1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 2, 1, -1, -1],
    );
    ipq3MaxEmpty2.insert(10);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 3, 2, 1, 4, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 2, 1, 4, -1],
    );
    ipq3MaxEmpty2.insert(56);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 56],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 1, 4, 2],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 2, 4, 1],
    );
    ipq3MaxEmpty2.insert(3);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 56, 3, null, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 1, 4, 2, 6, -1, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 2, 4, 1, 6, -1, -1, -1, -1, -1],
    );
    ipq3MaxEmpty2.insert(4);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 56, 3, 4, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 1, 4, 2, 6, 7, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 2, 4, 1, 6, 7, -1, -1, -1, -1],
    );
    ipq3MaxEmpty2.insert(-1);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 56, 3, 4, -1, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 1, 4, 2, 6, 7, 8, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 2, 4, 1, 6, 7, 8, -1, -1, -1],
    );
    ipq3MaxEmpty2.insert(23);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 56, 3, 4, -1, 23, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 9, 4, 2, 6, 7, 8, 1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 9, 5, 2, 4, 1, 6, 7, 8, 3, -1, -1],
    );
  });
  it('should allow you to update an elment while maintaining the heap invariant', () => {
    ipq3MaxEmpty2.change(3, 0);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 0, 10, 56, 3, 4, -1, 23, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 7, 9, 4, 2, 6, 3, 8, 1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 9, 5, 7, 4, 1, 6, 2, 8, 3, -1, -1],
    );
    /* ------------------------------- change back ------------------------------ */
    ipq3MaxEmpty2.change(3, 12);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 56, 3, 4, -1, 23, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 9, 4, 2, 6, 7, 8, 1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 9, 5, 2, 4, 1, 6, 7, 8, 3, -1, -1],
    );
  });
  it('should throw an error when you try to change an item using an invalid index', () => {
    expect(() => { ipq3MaxEmpty2.change(0, 122); }).toThrowError(NO_ITEM_TO_CHANGE);
  });
  it('should return false when we ask if it is empty when it is not', () => {
    expect(ipq3MaxEmpty2.isEmpty()).toBe(false);
  });
  it('should return the root when we ask for it so long as it exists', () => {
    expect(ipq3MaxEmpty2.root()).toBe(56);
  });
  // TODO: test getItem(index)
  // TODO: test contains, rootIndex, and iterator
  it('should maintain the heap invariant as root is deleted and return the root Item.', () => {
    /* ------------------------------ first delete ------------------------------ */
    let deletedRoot: (number | null) = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(56);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, 23, 3, 4, -1, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 5, 3, 1, 4, 2, 6, 7, 8, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 2, 4, 1, 6, 7, 8, -1, -1, -1],
    );
    /* ------------------------------ second delete ----------------------------- */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(23);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 12, 10, -1, 3, 4, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 3, 7, 1, 4, 2, 6, 5, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 1, 4, 7, 6, 2, -1, -1, -1, -1],
    );
    /* ------------------------------ third delete ------------------------------ */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(12);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 4, 10, -1, 3, null, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 4, 3, 1, 5, 2, 6, -1, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 2, 1, 4, 6, -1, -1, -1, -1, -1],
    );
    /* ------------------------------ fourth delete ----------------------------- */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(10);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, 4, 3, -1, null, null, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 3, 4, 1, 5, 2, -1, -1, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 3, 5, 1, 2, 4, -1, -1, -1, -1, -1, -1],
    );
    /* ------------------------------ fifth delete ------------------------------ */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(4);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 4, -4, -1, 3, null, null, null, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, 4, 2, 3, -1, -1, -1, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, 3, 4, 2, -1, -1, -1, -1, -1, -1, -1],
    );
    /* ------------------------------ sixth delete ------------------------------ */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(4);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 3, -4, -1, null, null, null, null, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, 3, 2, -1, -1, -1, -1, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, 3, 2, -1, -1, -1, -1, -1, -1, -1, -1],
    );
    /* ----------------------------- seventh delete ----------------------------- */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(3);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, -1, -4, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, 2, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, 2, -1, -1, -1],
    );
    /* ------------------------------ eighth delete ----------------------------- */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(-1);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, -4, null, null, null, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, -1, -1, -1, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, -1, -1, -1, -1],
    );
    /* --------------------------- final ninth delete --------------------------- */
    deletedRoot = ipq3MaxEmpty2.deleteRoot();
    expect(deletedRoot).toBe(-4);
    expect(ipq3MaxEmpty2.getItems()).toEqual([null, null, null]);
    expect(ipq3MaxEmpty2.getHeap()).toEqual([-1, -1, -1]);
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual([-1, -1, -1]);
  });
  it('should know when the priority queue is empty', () => {
    expect(ipq3MaxEmpty2.isEmpty()).toBe(true);
  });
  it('should throw an invalid index error if client tries to delete root from an empty heap', () => {
    expect(() => { ipq3MaxEmpty2.deleteRoot(); }).toThrowError(NO_ROOT_TO_DELETE);
  });
  it('should throw an error when trying to grab the root when the heap is empty', () => {
    expect(() => { ipq3MaxEmpty2.root(); }).toThrowError(NO_ROOT);
  });
  // TODO: test contains, rootIndex, and iterator when empty
  /* ------------------------ insert to test delete(k) ------------------------ */
  // NOTE: you're building off of the initial pq which has the initialNumberOfItems set to 2
  // after deleting all items it's still has the same arraysSize of 3
  it('should, when given an items\' index, delete a specific item while maintaining the heap invariant', () => {
    ipq3MaxEmpty2.insert(5);
    ipq3MaxEmpty2.insert(4);
    ipq3MaxEmpty2.insert(3);
    ipq3MaxEmpty2.insert(2);
    ipq3MaxEmpty2.insert(1);
    ipq3MaxEmpty2.delete(2);
    expect(ipq3MaxEmpty2.getItems()).toEqual(
      [null, 5, 1, 3, 2, null],
    );
    expect(ipq3MaxEmpty2.getHeap()).toEqual(
      [-1, 1, 2, 3, 4, -1],
    );
    expect(ipq3MaxEmpty2.getInverseMap()).toEqual(
      [-1, 1, 2, 3, 4, -1],
    );
  });
  it('should throw an error when a client tries to delete at an items\' index that is invalid', () => {
    expect(() => { ipq3MaxEmpty2.delete(0); }).toThrowError(INDEX_TOO_LOW);
    expect(() => { ipq3MaxEmpty2.delete(100); }).toThrowError(INDEX_TOO_HIGH);
  });
});

describe('tests for a ternary min IPQ that starts empty with valid initial'
+ ' array size that works with type number', () => {
  const ipq3MinEmpty1 = new IndexDPQ({
    D: 3,
    max: false,
    initialNumberOfItems: 1,
  });
  it('should let us insert number items while maintaining the heap invariant', () => {
    ipq3MinEmpty1.insert(4);
    ipq3MinEmpty1.insert(-4);
    ipq3MinEmpty1.insert(12);
    ipq3MinEmpty1.insert(10);
    ipq3MinEmpty1.insert(-8);
    expect(ipq3MinEmpty1.getItems()).toEqual(
      [null, 4, -4, 12, 10, -8, null, null],
    );
    expect(ipq3MinEmpty1.getHeap()).toEqual(
      [-1, 5, 2, 3, 4, 1, -1, -1],
    );
    expect(ipq3MinEmpty1.getInverseMap()).toEqual(
      [-1, 5, 2, 3, 4, 1, -1, -1],
    );
  });
  // it('should allow you to update an elment while maintaining the heap invariant', () => {
  //   ipq3MinEmpty1.change(3, 0);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, 0, 10, 56, 3, 4, -1, 23, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 5, 7, 9, 4, 2, 6, 3, 8, 1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 9, 5, 7, 4, 1, 6, 2, 8, 3, -1, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------- change back ------------------------------ */
  //   ipq3MinEmpty1.change(3, 12);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, 12, 10, 56, 3, 4, -1, 23, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 5, 3, 9, 4, 2, 6, 7, 8, 1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 9, 5, 2, 4, 1, 6, 7, 8, 3, -1, -1, -1, -1, -1, -1],
  //   );
  // });
  // it('should throw an error when you try to change an item using an invalid index', () => {
  //   expect(() => { ipq3MinEmpty1.change(0, 122); }).toThrowError(NO_ITEM_TO_CHANGE);
  // });
  // it('should return false when we ask if it is empty when it is not', () => {
  //   expect(ipq3MinEmpty1.isEmpty()).toBe(false);
  // });
  // it('should return the root when we ask for it so long as it exists', () => {
  //   expect(ipq3MinEmpty1.root()).toBe(56);
  // });
  // it('should maintain the heap invariant as root is deleted and return the root Item.', () => {
  //   /* ------------------------------ first delete ------------------------------ */
  //   let deletedRoot: (number | null) = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(56);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, 12, 10, 23, 3, 4, -1, null, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 5, 3, 1, 4, 2, 6, 7, 8, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 3, 5, 2, 4, 1, 6, 7, 8, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------ second delete ----------------------------- */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(23);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, 12, 10, -1, 3, 4, null, null, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 3, 7, 1, 4, 2, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 3, 5, 1, 4, 7, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------ third delete ------------------------------ */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(12);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, 4, 10, -1, 3, null, null, null, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 4, 3, 1, 5, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 3, 5, 2, 1, 4, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------ fourth delete ----------------------------- */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(10);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, 4, 3, -1, null, null, null, null, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 3, 4, 1, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 3, 5, 1, 2, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------ fifth delete ------------------------------ */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(4);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 4, -4, -1, 3, null, null, null, null, null, null, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 1, 4, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 1, 3, 4, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------ sixth delete ------------------------------ */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(4);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 3, -4, -1, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 1, 3, 2, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 1, 3, 2, -1, -1, -1, -1],
  //   );
  //   /* ----------------------------- seventh delete ----------------------------- */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(3);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, -1, -4, null, null, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 1, 2, -1, -1, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 1, 2, -1, -1, -1, -1, -1],
  //   );
  //   /* ------------------------------ eighth delete ----------------------------- */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(-1);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, -4, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 1, -1, -1],
  //   );
  //   /* --------------------------- final ninth delete --------------------------- */
  //   deletedRoot = ipq3MinEmpty1.deleteRoot();
  //   expect(deletedRoot).toBe(-4);
  //   expect(ipq3MinEmpty1.getItems()).toEqual([]);
  //   expect(ipq3MinEmpty1.getHeap()).toEqual([]);
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual([]);
  // });
  // it('should know when the priority queue is empty', () => {
  //   expect(ipq3MinEmpty1.isEmpty()).toBe(true);
  // });
  // it('should throw an invalid index error if client tries to delete root from an empty heap', () => {
  //   expect(() => { ipq3MinEmpty1.deleteRoot(); }).toThrowError(NO_ROOT_TO_DELETE);
  // });
  // it('should throw an error when trying to grab the root when the heap is empty', () => {
  //   expect(() => { ipq3MinEmpty1.root(); }).toThrowError(NO_ROOT);
  // });
  // /* ------------------------ insert to test delete(k) ------------------------ */
  // it('should, when given an items\' index, delete a specific item while maintaining the heap invariant', () => {
  //   ipq3MinEmpty1.insert(5);
  //   ipq3MinEmpty1.insert(4);
  //   ipq3MinEmpty1.insert(3);
  //   ipq3MinEmpty1.insert(2);
  //   ipq3MinEmpty1.insert(1);
  //   ipq3MinEmpty1.delete(2);
  //   expect(ipq3MinEmpty1.getItems()).toEqual(
  //     [null, 5, 1, 3, 2, null, null, null],
  //   );
  //   expect(ipq3MinEmpty1.getHeap()).toEqual(
  //     [-1, 1, 2, 3, 4, -1, -1, -1],
  //   );
  //   expect(ipq3MinEmpty1.getInverseMap()).toEqual(
  //     [-1, 1, 2, 3, 4, -1, -1, -1],
  //   );
  // });
  // it('should throw an error when a client tries to delete at an items\' index that is invalid', () => {
  //   expect(() => { ipq3MinEmpty1.delete(0); }).toThrowError(INDEX_TOO_LOW);
  //   expect(() => { ipq3MinEmpty1.delete(100); }).toThrowError(INDEX_TOO_HIGH);
  // });
});

// TODO: build heap constructor, heapsort

// const ipq0MinEmpty32 = new IndexPQ({
//   D: 0,
//   max: false,
//   initialNumberOfItems: 32,
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
