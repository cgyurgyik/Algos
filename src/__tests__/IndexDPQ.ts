/* eslint-disable no-new */
/* eslint-disable max-len */
import { describe, expect, it } from '@jest/globals';
// TODO: fix import. it works but eslint complains
import {
  IndexDPQ, Comparable,
} from '../data_structures/IndexDPQ';
// import errors
// TODO: think if there is a more elegant way to do this
import {
  INDEX_TOO_HIGH,
  INDEX_TOO_LOW,
  INITIAL_NUMBER_OF_ITEMS_TOO_SMALL,
  INVALID_CONSTRUCTOR_OUT_OF_SYNC,
  INVALID_CONSTRUCTOR_MISSING_ARGUMENTS,
  NO_ROOT_TO_DELETE,
  NO_ITEM_TO_CHANGE,
  DEGREE_TOO_LOW,
} from '../data_structures/utils'
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
  /* ------------------------ check initial empty setup ----------------------- */
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
  /* ---------------------------- check insertions ---------------------------- */
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
  /* ------------------------------ check updates ----------------------------- */
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
  /* ----------------------- check invalid index update ----------------------- */
  it('should throw an error when you try to change an item using an invalid index', () => {
    expect(() => { ipq3MaxEmpty2.change(0, 122); }).toThrowError(NO_ITEM_TO_CHANGE);
  });
  /* ---------------------------- check inspections --------------------------- */
  it('should return false when we ask if it is empty when it is not', () => {
    expect(ipq3MaxEmpty2.isEmpty()).toBe(false);
  });
  it('should return the root when we ask for it so long as it exists', () => {
    expect(ipq3MaxEmpty2.root()).toBe(56);
  });
  it('should, given an items index, return a copy of the item at that index.', () => {
    expect(ipq3MaxEmpty2.getItem(3)).toBe(12);
  });
  it('should confirm that an item exists at a certain index, and return false otherwise', () => {
    expect(ipq3MaxEmpty2.contains(3)).toBe(true);
    expect(ipq3MaxEmpty2.contains(0)).toBe(false);
    expect(ipq3MaxEmpty2.contains(10)).toBe(false);
  });
  it('should, given a non-empty heap, return the items\' index for the root element.', () => {
    expect(ipq3MaxEmpty2.rootIndex()).toBe(5);
  });
  /* ----------------------------- check deletions ---------------------------- */
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
  /* ------------------------- check empty when empty ------------------------- */
  it('should know when the priority queue is empty', () => {
    expect(ipq3MaxEmpty2.isEmpty()).toBe(true);
  });
  /* -------------------------- check invalid delete -------------------------- */
  it('should throw an invalid index error if client tries to delete root from an empty heap', () => {
    expect(() => { ipq3MaxEmpty2.deleteRoot(); }).toThrowError(NO_ROOT_TO_DELETE);
  });
  /* ------------------------- check empty inspections ------------------------ */
  it('should return null when trying to grab the root when the heap is empty', () => {
    expect(ipq3MaxEmpty2.root()).toBe(null);
  });
  it('should, given an empty heap, return null when you try to get the rootIndex', () => {
    expect(ipq3MaxEmpty2.rootIndex()).toBe(null);
  });
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

/* -------------------------------- heapsort -------------------------------- */
describe('tests heapsort for a ternary min IPQ that starts empty with valid initial'
+ ' array size that works with type number', () => {
  const ipq3MinEmpty1 = new IndexDPQ<number>({
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
  /* ------------------------ check that heapsort works ----------------------- */
  it('should correctly sort items when heapSort is called.', () => {
    ipq3MinEmpty1.heapSort();
    expect(ipq3MinEmpty1.getItems()).toEqual(
      [null, 4, -4, 12, 10, -8, null, null],
    );
    expect(ipq3MinEmpty1.getHeap()).toEqual(
      [-1, 5, 2, 1, 4, 3, -1, -1],
    );
    expect(ipq3MinEmpty1.getInverseMap()).toEqual(
      [-1, 3, 2, 5, 4, 1, -1, -1],
    );
    ipq3MinEmpty1.insert(10);
    ipq3MinEmpty1.insert(77);
    ipq3MinEmpty1.insert(-8);
    ipq3MinEmpty1.insert(0);
    ipq3MinEmpty1.heapSort();
    // TODO: points to use for iterator
    const sorted: (number | null)[] = [];
    const heapCopy: number[] = ipq3MinEmpty1.getHeap();
    const itemsCopy: (number | null)[] = ipq3MinEmpty1.getItems();
    for (let i = 1; i <= ipq3MinEmpty1.getNumItems(); i++) {
      sorted.push(itemsCopy[heapCopy[i]]);
    }
    expect(sorted).toEqual(
      [-8, -8, -4, 0, 4, 10, 10, 12, 77],
    );
  });
});
/* --------------------------------- strings -------------------------------- */
describe('tests for a priority queue that compares strings', () => {
  const props = {
    D: 2,
    max: false,
    initialNumberOfItems: 1,
  };
  const ipq2MinEmpty1String = new IndexDPQ<string>(props);

  it('should allow you to insert items while maintaining the heap invariant.'
              + ' String comparison is done lexicographically', () => {
    ipq2MinEmpty1String.insert('cat');
    ipq2MinEmpty1String.insert('bat');
    ipq2MinEmpty1String.insert('boat');
    ipq2MinEmpty1String.insert('apple');
    ipq2MinEmpty1String.insert('null');
    expect(ipq2MinEmpty1String.getItems()).toEqual(
      [null, 'cat', 'bat', 'boat', 'apple', 'null', null, null],
    );
    expect(ipq2MinEmpty1String.getHeap()).toEqual(
      [-1, 4, 2, 3, 1, 5, -1, -1],
    );
    expect(ipq2MinEmpty1String.getInverseMap()).toEqual(
      [-1, 4, 2, 3, 1, 5, -1, -1],
    );
  });
});
/* --------------------------------- bigints -------------------------------- */
describe('tests for a priority queue that compares bigInts', () => {
  const props = {
    D: 2,
    max: false,
    initialNumberOfItems: 1,
  };
  const ipq2MinEmpty1BigInt = new IndexDPQ<bigint>(props);
  const b1 = BigInt('0b100000100000001'); // 4161n
  const b2 = BigInt(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992n
  const b3 = BigInt('0x123'); // 291n
  const b4 = BigInt(0);
  const b5 = BigInt('0o123'); // 83n
  it('should allow you to insert items while maintaining the heap invariant.'
  + ' BigInt comparison should function like number', () => {
    ipq2MinEmpty1BigInt.insert(b1);
    ipq2MinEmpty1BigInt.insert(b2);
    ipq2MinEmpty1BigInt.insert(b3);
    ipq2MinEmpty1BigInt.insert(b4);
    ipq2MinEmpty1BigInt.insert(b5);
    expect(ipq2MinEmpty1BigInt.getItems()).toEqual(
      [null, b1, b2, b3, b4, b5, null, null],
    );
    expect(ipq2MinEmpty1BigInt.getHeap()).toEqual(
      [-1, 4, 5, 1, 2, 3, -1, -1],
    );
    expect(ipq2MinEmpty1BigInt.getInverseMap()).toEqual(
      [-1, 3, 4, 5, 1, 2, -1, -1],
    );
  });
});
/* ------------------------- custom comparable items ------------------------ */
// eslint-disable-next-line no-use-before-define
class TestItem implements Comparable<TestItem> {
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
    return (this.calculateScore() === x.calculateScore());
  }

  public isStrictlyEqual(x: TestItem): boolean {
    return (this === x);
  }

  public changeDonation(newAmount: number): void {
    this.donation = newAmount;
  }

  public getDonation(): number {
    return this.donation;
  }
}

describe('tests for a priority queue that compares comparable Items', () => {
  const props = {
    D: 3,
    max: false,
    initialNumberOfItems: 2,
  };
  const ipq3MinEmpty2 = new IndexDPQ<TestItem>(props);
  const c1: TestItem = new TestItem('Alice', new Uint32Array([1, 1]), 200);
  const c2: TestItem = new TestItem('Roger', new Uint32Array([2, 3]), 150);
  const c3: TestItem = new TestItem('Bob', new Uint32Array([4, 5]), 500);
  const c4: TestItem = new TestItem('Albert', new Uint32Array([2, 3]), 101);
  const c5: TestItem = new TestItem('Alex', new Uint32Array([2, 3]), 100);
  it('should allow you to insert custom comparable items, while maintaining the heap invariant', () => {
    ipq3MinEmpty2.insert(c1);
    ipq3MinEmpty2.insert(c2);
    ipq3MinEmpty2.insert(c3);
    ipq3MinEmpty2.insert(c4);
    ipq3MinEmpty2.insert(c5);
    expect(ipq3MinEmpty2.getItems()).toEqual(
      [null, c1, c2, c3, c4, c5],
    );
    expect(ipq3MinEmpty2.getHeap()).toEqual(
      [-1, 5, 4, 3, 2, 1],
    );
    expect(ipq3MinEmpty2.getInverseMap()).toEqual(
      [-1, 5, 4, 3, 2, 1],
    );
  });
  it('should allow you to grab a copy of the root item, but modifying the copy will not change the priority queue.', () => {
    const copyRoot = ipq3MinEmpty2.root();
    expect(copyRoot).not.toBe(c5);
    expect(copyRoot).toEqual(c5);
    copyRoot?.changeDonation(10000);
    expect(ipq3MinEmpty2.root()?.getDonation()).toBe(c5.getDonation());
  });
  it('should allow you to grab a copy of an item at an index, but not modify it', () => {
    const copyItem = ipq3MinEmpty2.getItem(3);
    expect(copyItem).not.toBe(c3);
    expect(copyItem).toEqual(c3);
    copyItem?.changeDonation(30);
    expect(ipq3MinEmpty2.getItem(3)?.getDonation()).toBe(c3.getDonation());
  });
});
describe('tests for a priority queue that compares comparable Items seeded with array', () => {
  const c1: TestItem = new TestItem('Alice', new Uint32Array([1, 1]), 200); // score 13000
  const c2: TestItem = new TestItem('Roger', new Uint32Array([2, 3]), 150); // score ~12450
  const c3: TestItem = new TestItem('Bob', new Uint32Array([4, 5]), 500); // score 30301
  const c4: TestItem = new TestItem('Albert', new Uint32Array([2, 3]), 101); // score 6566
  const c5: TestItem = new TestItem('Alex', new Uint32Array([2, 3]), 100); // score 6565
  const props = {
    D: 3,
    max: false,
    array: [c1, c2, c3, c4, c5],
  };
  const ipq3MinCustomSeeded = new IndexDPQ<TestItem>(props);
  it('should build from array constructor while maintaining the heap invariant', () => {
    expect(ipq3MinCustomSeeded.getItems()).toEqual(
      [null, c1, c2, c3, c4, c5],
    );
    expect(ipq3MinCustomSeeded.getHeap()).toEqual(
      [-1, 5, 2, 3, 4, 1],
    );
    expect(ipq3MinCustomSeeded.getInverseMap()).toEqual(
      [-1, 5, 2, 3, 4, 1],
    );
  });
  // TODO: using json parse instead of structured clone because jest seems to not support
  // structured clone. so testing is going to be more complicated
  it('should allow you to get Items in heap order with the getItemsInHeapOrder method', () => {
    const itemsInHeapOrder: (TestItem | null)[] = ipq3MinCustomSeeded.getItemsInHeapOrder();
    expect(itemsInHeapOrder[0]).not.toBe(c5);
    expect(itemsInHeapOrder[0]?.getDonation()).toEqual(c5.getDonation());
    expect(itemsInHeapOrder[1]).not.toBe(c2);
    expect(itemsInHeapOrder[1]?.getDonation()).toEqual(c2.getDonation());
    expect(itemsInHeapOrder[2]).not.toBe(c3);
    expect(itemsInHeapOrder[2]?.getDonation()).toEqual(c3.getDonation());
    expect(itemsInHeapOrder[3]).not.toBe(c4);
    expect(itemsInHeapOrder[3]?.getDonation()).toEqual(c4.getDonation());
    expect(itemsInHeapOrder[4]).not.toBe(c1);
    expect(itemsInHeapOrder[4]?.getDonation()).toEqual(c1.getDonation());
  });
});
/* ------------------------------- empty array ----------------------------- */
describe('tests for a priority queue that has been given an empty array for construction', () => {
  const ipq4MinSeededEmpty = new IndexDPQ<TestItem>({
    D: 4,
    max: true,
    array: [],
  });
  it('should start with arrays of size 1 that are either null or -1', () => {
    expect(ipq4MinSeededEmpty.getItems()).toEqual([null]);
    expect(ipq4MinSeededEmpty.getHeap()).toEqual([-1]);
    expect(ipq4MinSeededEmpty.getInverseMap()).toEqual([-1]);
  });
});
/* -------------------------- invalid construction -------------------------- */
describe('tests that right errors get thrown for invalid construction.', () => {
  /* ------------- neither array nor initialNumberOfItems provided ------------ */
  expect(() => { new IndexDPQ<number>({ D: 3, max: true }); }).toThrowError(INVALID_CONSTRUCTOR_MISSING_ARGUMENTS);
  /* --------------- array and initialNumberOfItems out of sync --------------- */
  expect(() => {
    new IndexDPQ<number>({
      D: 3, max: true, initialNumberOfItems: 10, array: [],
    });
  }).toThrowError(INVALID_CONSTRUCTOR_OUT_OF_SYNC);
  /* ---------------------- initialNumberOfItems too low ---------------------- */
  expect(() => { new IndexDPQ<number>({ D: 3, max: true, initialNumberOfItems: -1 }); }).toThrowError(INITIAL_NUMBER_OF_ITEMS_TOO_SMALL);
  /* ----------------------------- degree too low ----------------------------- */
  expect(() => { new IndexDPQ<number>({ D: 0, max: true, initialNumberOfItems: 3 }); }).toThrowError(DEGREE_TOO_LOW);
});
/* ---------------------------- very large values --------------------------- */
