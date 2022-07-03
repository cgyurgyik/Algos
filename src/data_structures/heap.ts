/**
 * General Heap
 * @param type (min or max)
 */
// NOTE: could this be written in such a way that takes in any array type and
// custom comparison functions?
class Heap {
  type: 'min' | 'max';

  arr: number[];

  size: number;

  constructor(type: 'min' | 'max', arr: number[] = []) {
    this.type = type;
    this.arr = arr;
    this.size = arr.length;

    this.heapify();
  }

  // make private
  heapify() {
    // heapify
    console.log(`this is a ${this.type} heap`);
  }
  heapifyUp() {
    // needs an index if recursive
  }
  heapifyDown(index: number) {

  }
  insert() {

  }
  pop() {
    // remove root
    // this.heapifyDown
  }
  peek() {
    // see min or max value
  }
}

const whatever = new Heap('min');
console.log(whatever);
