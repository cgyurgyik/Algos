/**
 * MaxHeap
 * @param arr starting array that either is already heapified or needs to be
 */
class MaxHeap {
  /**
   * We are using an array to store the heap nodes. This is very efficient
   */
  private heap: number[];

  /**
   * @param arr optionally you can pass in an array of numbers that represent the heap
   * it will be heapified to make sure it is a valid heap
   */
  constructor(arr: number[] = []) {
    this.heap = arr;
    // if an array was passed in, heapify it
    if (this.heap.length) this.heapify();
  }

  /**
   * @return peek returns the root node value
   */
  peek() {
    return this.heap[0];
  }

  /**
   * NOTE: we're using static here since we don't need to use the this
   * keyword
   * @param index
   * @returns index of passed in node's left child
   */
  static findLeft(index: number) {
    return (2 * index) + 1;
  }

  /**
   * @param index
   * @returns index of passed in node's right child
   */
  static findRight(index: number) {
    return (2 * index) + 2;
  }

  /**
    * @param index
    * @returns index of passed in node's parent
    */
  static findParent(index: number) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * @returns the index of the first non-leaf node in the heap
   */
  findLastNonLeaf() {
    return MaxHeap.findParent(this.heap.length - 1);
  }

  /**
   * Reorders the array starting from index passed in so that the corresponding node's value
   * is larger than its children
   * @param index of the node you want to heapify down
   */
  heapifyDown(index: number) {
    // Base Case: No left child or curr children are smaller than current
    const left: number = MaxHeap.findLeft(index);
    const leftVal: number = this.heap[left];
    if (leftVal === undefined) return;
    const right: number = MaxHeap.findRight(index);
    const rightVal: number = this.heap[right];
    let childMax = left;
    // NOTE: undefined comparisons will always return false in javascript
    if (rightVal !== undefined && rightVal > leftVal) childMax = right;
    const childMaxVal = this.heap[childMax];
    const curr = this.heap[index];
    if (curr >= childMaxVal) return;
    // Recursive Case: Swap with max child
    this.heap[index] = childMaxVal;
    this.heap[childMax] = curr;
    this.heapifyDown(childMax);
  }

  /**
   * Reorders the array starting from index passed in so that the corresponding node's value
   * is smaller than that of its parent
   * @param index of the node you want to heapify up
   */
  heapifyUp(index: number) {
    // Base Case: No parent or curr <= parentVal
    const curr = this.heap[index];
    const parent = MaxHeap.findParent(index);
    const parentVal = this.heap[parent];
    if (parentVal === undefined || curr <= parentVal) return;
    // Recursive Case: Swap with parent
    this.heap[index] = parentVal;
    this.heap[parent] = curr;
    this.heapifyUp(parent);
  }

  /**
   * insert node onto heap and bubble it up to where it needs to be for
   * the array to stay a heap
   * @param value of node you want to insert
   */
  insert(value: number) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * this will pop off the root node from the heap and heapify
   * @returns either the value of the removed root or null if the heap was empty
   */
  removeRoot(): number | null {
    // Make sure that the heap has an element to remove
    if (!this.heap.length) {
      console.log('Cannot pop root since heap is empty!');
      return null;
    }
    const removed: number = this.heap[0];
    const lastVal = this.heap.pop();
    // If the heap only had one element to begin with just return the popped value
    // checking lastVal explicitly for typescript
    if (this.heap.length && lastVal !== undefined) {
      this.heap[0] = lastVal;
      this.heapifyDown(0);
    }
    return removed;
  }

  heapify() {
    // check if heap has enough elements to heapify
    if (this.heap.length < 2) return;
    // identify starting point (last non-leaf element)
    let curr = this.findLastNonLeaf();
    // iterate through heap from curr until 0th indexed element
    while (curr >= 0) {
      // compare current value with children value and swap as needed recursively
      this.heapifyDown(curr);
      curr -= 1;
    }
  }
}

const testHeap = new MaxHeap([3, 4, 1, 5, 6, 10, 4, 7, 8, 2, 17, 7, 3, 10]);
// [17, 8, 10, 7, 6, 7, 10, 3, 5, 2, 4, 1, 3, 4]
testHeap.insert(22);
// [22, 8, 17, 7, 6, 7, 10, 3, 5, 2, 4, 1, 3, 4, 10]
while (testHeap.peek() !== undefined) {
  console.log(testHeap.removeRoot());
} // 22, 17, 10, 10, 8, 7, 7, 6, 5, 4, 4, 3, 3, 2, 1

const testHeap2 = new MaxHeap();
console.log(testHeap2.peek()); // undefined
testHeap2.insert(12);
console.log(testHeap2.peek()); // 12
