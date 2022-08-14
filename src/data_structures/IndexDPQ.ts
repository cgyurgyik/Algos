/* eslint linebreak-style: ["error", "linux"] */

// TODO: once everything is finalized go through and clean up variable names in
// documentation
// I don't love the name keys for the items array. values is kind of vague too
// items might be better

/* -------------------------------------------------------------------------- */
/*                     GENERALIZED INDEXED PRIORITY QUEUE                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                    GOALS                                   */
/* -------------------------------------------------------------------------- */
/**
 * Indexed Priority Queue
 *  1[]). D-ary tree/heap (not just binary)
 *  2[]). Min or Max heap depending on what's passed to constructor
 *  3[]). Can compare generic comparable types (including custom, bigint,
 *  number, and string)
 *  4[]). Manually double and halve array sizes when necessary
 *  5[]). Allow full sorting with heapsort
 */
/* -------------------------------------------------------------------------- */
/*                                    DETAILS                                 */
/* -------------------------------------------------------------------------- */
/**
 * - we are using 1-indexed arrays to make some of the arithmetic a little nicer
 * // TODO: it actually makes the d-heap parent and childrne calculations a bit
 * worse. is 0-indexed easier overall?
 * - mostly based off of Sedgwick textbook so naming conventions usually follow
 * - Sedgwick suggests returning -1 for indices when an item isn't found. I
 * don't mind this, but for the actual items array (values/keys) i think i need
 * null
 */
/* -------------------------------------------------------------------------- */
/*                    COMPARISON TO REGULAR PRIORITY QUEUE                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                APPLICATIONS                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                               VARIABLE NAMES                               */
/* -------------------------------------------------------------------------- */
/**
 * Item: called Key in Sedgwick, but i think Key makes you think of key value
 * pairs, so it's a bit confusing to me.
 *
 * items: array in which we store our Item instances
 *
 * pq: the heap. array in which the indices correspond to positions on a tree
 * and the values are indices to the items array.
 *
 * qp: the inverse map. array in which the indices correspond to indices of
 * items array (aka they map to the items) and whose values are the indices
 * of the heap. qp[1] is the position on the heap/tree of the item with index 1.
 * Even more explicitly, say that you have an items array that looks like this:
 *      items = [null, {'name': 'Bob', 'age': 30}, {'name: 'Alice', 'age: 25}]
 * and pq = [-1, 2, 1]
 * qp[0] tells you where on the heap Bob (the object with name Bob) is stored.
 * in this case, Bob is stored at the second index in the heap.
 * qp = [-1, 2, 1] in this case (remember that for all three arrays we don't use
 * the 0th indexed element so we have 1-indexed arrays)
 *
 * arraysSize: this is the actual static size of all three of the arrays. It
 * gets set in the constructors and then might have to double or halve as more
 * or less space is needed to store items.
 *
 * numberOfElementsInHeap: this tells us how many Items the heap pq is keeping
 * track of. It won't be the same as arraysSize always since, the arrays won't
 * always be used fully and will have nulls or -1s to indicate when an item
 * isn't present.
 *
 * D: this is the degree of our heap (aka the maximum number of subtrees a node
 * can have)
 *
 * max: true if it is a max heap. false if it is a min heap
 */
/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */
/* ------------------------------ constructors ------------------------------ */
/**
 *[] IndexDPQ(int initialArraysSize, int D, boolean max = true)
 * (create a priority queue with initial capacity initialArraysSize, using a d-ary tree/heap,
 *  maxpq if max == true otherwise minpq)
 *
 * strategy:
 * -[] define Comparable interface (for now with ecmascript specs so
 * isLessThan, isLooselyEqual, isStrictlyEqual have to be methods that are
 * should be present)
 * -[] Comparable itself should take a generic that determines what its method
 * constraints take as args
 * -[] IndexDPQ should take a generic that extends the Comparable interface
 * unioned with the primitive types that are comparable with the < operator
 * (bigint, number, string)
 * -[] define private properties on the class that are the three arrays we
 * need, the size of the arrays (initialized by initialArraysSize), and the number of
 * elements in the heap
 *
 * time complexity:
 * O(1)
 *
 *[] IndexDPQ(Item[] array, int D, boolean max = true)
 * (create a priority queue building the pq from an existing array, using a d-ary
 *  tree/heap, maxpq if max == true otherwise minpq)
 *
 * strategy:
 * -[] look at the passed in array's length and use that to determine the size of
 * heap/pq, inversemap/qp
 * -[] set keys/values/items array to the passed in Item array
 * //TODO: compare inserting every item into the heap versus the other way
 * -[] fill out heap/pq and inversemap/qp
 * -[] find last element in heap that isn't a leaf (findLastInternal)
 * -[] while you aren't out of bounds (heap index > 0) iterate backwards through heap
 * -[] sink item at current position
 *
 * time complexity:
 * // TODO: check that nothing changes for a D != 2
 * - this one is actually important to understand more in depth. On first glance, since
 * the last non-leaf is around size()/degree it's easy to think that building the heap
 * takes O(N*ln(N)) since each sink is O(ln(N)). This is in fact not a tight bound.
 * The intuitive reason is that at the level right above the leaves, you only have to compare
 * once to get to the bottom. So at that level you have a constant compare time, but
 * order N nodes (N / D) to deal with. Whereas, if you look at the root node, in the worst
 * case you have to do order of log_d(N) aka O(ln(N)) compares to get to the bottom, but
 * you only have a constant (1) nodes to deal with. If you do the precise mathematical
 * analysis you can bound the sum you get with the geometric sum, and that allows you
 * to get a tight bound of:
 * O(N)
 */
/* -------------------------------- heapsort -------------------------------- */
/**
 * Item[] sortdown()             (returns the sorted list of items using heapsort)
 *
 * strategy:
 * -[] I'm assuming that the general idea is to keep calling deleteRoot and
 * saving the result in another array that gets returned once there are no items
 * left in the heap
 * -[] If we are in minPQ mode, we should return the array as is. if we are in
 * maxPQ mode, it needs to be reversed so that we return the elements in non-decreasing
 * order
 * -[] do this in-place by splitting the heap into a sorted and unsorted part.
 * this can be done without violating the heap invariant I think (unsorted is still
 * not violating invariant)
 *
 * time complexity:
 * //TODO: do analysis
 * O(N*ln(N))
 */
/* -------------------------------- insertion ------------------------------- */
/**
 *[] void insert(int k, Item item) (insert item; associate it with k)
 * NOTE: k refers to the index in keys array.
 * //TODO: figure out why you wouldn't just always insert at last index in keys
 * won't keys' length be the same as the heap's/pq's length always?
 *
 * strategy:
 * -[] make sure that you don't have a key at index k in keys array
 * -[] check to see if you can fit another Item in arrays. if not rebuild the
 *  arrays with double the space
 * -[] add the Item at the end of the key's array
 * -[] point the next unfilled element of the heap (pq) to the newly added Item
 * -[] update the inverse map qp (map from Key/Item array index to heap/pq index)
 * -[] increment the heap/pq size property
 * -[] swim the last element in heap/pq till
 *
 * time complexity:
 * - rebuilding array on insert should be amortized //TODO: do the math to prove
 * - swim is the leading function in terms or order of growth
 * O(log_d(N)) = O(ln(N)
 */
/* -------------------------------- deletion -------------------------------- */
/**
 * void delete(int k)            (remove k and its associated item)
 *
 * strategy:
 * -[] first check to see if you should resize the arrays. if removing this item
 * would bring you below the 1/4 full mark, for each array create another array
 * that is half the size of the original and copy everything over.
 * -[] set qp[pq[k]] to be deleted (-1)
 * -[] swap the item at index k with the last item (using the heap size property) in heap/pq
 * -[] set pq's last item to be deleted (-1)
 * -[] delete item from keys array
 * -[] decrement heap size
 * -[] call sink on new root
 * -[] call swim on new root
 *
 * time complexity:
 * - resizing the array should be amortized //TODO: confirm
 * - calling sink and swim will be O(ln(N)) because if you call sink and current node
 * compares with children in such a way that you get back false (e.g. min heap and
 * children are not smaller) that's one check and then you break out of sink and move onto
 * swim. It's symmetric so calling sink first or swim first shouldn't make a difference
 * O(ln(N))
 *
 *
 * Item deleteRoot()             (remove a minimal or maximal item and return it)
 *
 * //NOTE: Sedgwick wants the index back.
 * //TODO: confirm that this makes no sense
 * int delRoot()                  (remove a minimal or maximal item and return its index)
 * I don't understand why you would ever need the index back unless
 * it is refering to the index of the items array. Even then, it should delete
 * the item from the items array as well and just return the item itself.
 *
 * strategy:
 * -[] save values/keys[pq[1]] as well as its index in the keys array
 * -[] call delete(1)
 * -[] return the deleted item
 *
 * time complexity:
 * - just takes complexity of delete(int k)
 * O(ln(N))
 *
 */
/* --------------------------------- update --------------------------------- */
/**
 * void change(int k, Item item) (change the item associated with k to item)
 *
 * strategy:
 * -[] k refers to the index of keys/items. update the value keys array to the
 * item that was passed in.
 * -[] look up position in heap/pq via qp[k]
 * -[] call sink and swim on that position
 *
 * time complexity:
 * O(ln(N))
 */
/* ------------------------ maintenance of invariant ------------------------ */
/**
 *[] swim(int k)                 (bubble item at index k to appropriate position)
 *
 * strategy:
 * -[] find heap/pq index of parent node
 * -[] while parent is in bounds (if not you are already at the root)
 * -[] compare current node with parent node
 * -[] compare using a compare function (handle both basic values and Comparables)
 * -[] swap (exch) nodes appropriately with compare function (deal with both max and
 * min priority queues) for inversemap/qp
 * -[] swap (exch) for heap/pq
 * -[] leave keys/items array alone
 * -[] break out if comparison tells you you're in the right place
 *
 * time complexity:
 * - you would at worst have to exchange floor(log_d(N)) times and swaps are constant
 * O(ln(N))
 *
 *
 * [] sink(int k)                (move item at index k down to appropriate position)
 *
 * strategy:
 * -[] find the smallest/largest children node indices
 * -[] while at least one child is in bounds
 * (call getChildrenIndices due to D-ary tree)
 * -[] use the comparsion abstraction compare(Item item1, Item item2)
 * -[] if current node is smaller/larger than the max/min of children
 * exch nodes from heap/pq and inversemap/qp
 * -[] otherwise break out
 *
 * time complexity:
 * - this is where the degree D of the tree comes into play. You have an inherent
 * tradeoff: the more subtrees (maximum of all nodes) the smaller the height
 * of the tree and thus the fewer levels you have to sink in the worst case,
 * BUT the more subtrees(...) the more children nodes you have to check to determine
 * which is the maximum or the minimum. //TODO: do the math in depth and confirm logic
 * So you would think that the best case scenario for a high degree is when you swim
 * a lot (fewer levels to swim up no comparing multiple items) and sink rarely. That
 * corresponds in practice to few deletes/updates and many inserts. I guess that is
 * a feasible situation, but one of the main advantages of priority queues is the
 * ability to quickly pop off the root node, so this doesn't seem like a frequent
 * use case.
 * O(d*log_d(N)) = O(ln(N))
 */
/* ------------------------------- inspection ------------------------------- */
/**
 *[] Item root()                    (return a minimal or maximal item)
 *
 * strategy:
 * -[] root will be at heap[0]/pq[0] and item will be at values[heap[0]]/keys[pq[0]]
 *
 * time complexity:
 * O(1)
 *
 *[] int rootIndex()                (return a minimal or maximal item's index)
 *
 * strategy:
 * -[] root index will be at heap[0]/pq[0] (whole point of priority queues
 * guaranteed by heap invariant)
 */
/* -------------------------------- searching ------------------------------- */
/**
 *[] boolean contains(int k)       (is k associated with some item)
 *
 * strategy:
 * -[] this k refers to the values/keys array i believe //TODO: confirm
 * -[] you can use the inverse map/qp array to check this (
 * if qp[k] is set to something other than null or -1 or undefined or whatever
 * we decide on, we know that the item is in the values/keys array)
 *
 * time complexity:
 * O(1) another benefit of this setup. in a regular heap, you would have to
 * traverse which would be O(log(N)) //TODO: confirm
 */
/* --------------------------------- utility -------------------------------- */
/**
 * //TODO:
 *[] findLastInternalNode()           (check heap and determine the position of
 * the last node that is not a leaf)
 *
 * strategy:
 */
// eslint-disable-next-line max-len
/** https://cs.stackexchange.com/questions/9914/finding-the-height-of-a-d-ary-heap
 * -[] find the height of the d-ary tree given size(). This will be:
 *  h = cieling(log_d(size()*(d-1)+1)) -1
 /* ------------------------------- math proof -------------------------------*/
/**
 * 1). define:
 *  a). h as the height of the tree (0 indexed)
 *  b). N_h as the number of elements in a FULL tree of height h. It is also the
 *  index of the last node in the tree for 1-indexed nodes.
 *  c). D is the degree of the tree (max subtrees per node)
 *
 * 2). Write N_h-1 in terms of N_h
 *  a). N_h is the sum from k = 0 to k = h of D^k
 *  b). N_(h-1) is the sum from k = 0 to k = h-1 of D^k
 *  c). D*N_(h-1) = N_h - 1
 *  d). it follows that N_(h-1) = (N_h - 1) / D
 *
 * 3). Write D^h (which is the number of elements at level h) in terms of N_h
 *  a). N_h - N_(h-1) = D^h this is intuitive because N_h - N_(h-1) basically
 *  just gives you the number of elements in the last row (visually remove tree
 *  with one less level from main tree and you just get the last level)
 *
 * 4). Write D^(h+1) in terms of D^h
 *  a). D^(h+1) = D * D^h
 *
 * 5). Write D^(h+1) in terms of N_h
 *  a). D^(h+1) = D * D^h (from 4)
 *  b). D * D^h = D * (N_h - N_(h-1)) (from 3)
 *  c). D * (N_h - N_(h-1)) = D * (N_h - ((N_h - 1) / D)) (from 2)
 *  d). D * (N_h - ((N_h - 1) / D)) = D * ((D * N_h) - (N_h - 1)) / D
 *  = ((D * N_h) - (N_h - 1)) = ((D - 1) * N_h) + 1 (from algebra)
 *  e). so D^(h + 1) = ((D - 1) * N_h) + 1
 *
 * 6). Take Log_D of both sides
 *  a). Log_D(D^(h + 1)) = Log_D(((D - 1) * N_h) + 1)
 *  b). simplify: h + 1 = Log_D(((D - 1) * N_h) + 1)
 *  c). so h = Log_D(((D - 1) * N_h) + 1) - 1
 *
 * //TODO: prove for m
 * we have successfuly found the height of tree given the last index of the
 * FULL tree. That being said, we want the index of the tree given the last
 * index of a complete (but not necessarily FULL tree).
 * We basically have to round up some index M sitting on the same level as N_h
 * so that it acts like N_h. Doing this is a little subtle so I will come back
 * to it later. The end result is:
 *
 * h = ceiling(Log_D((D - 1) * N_h) + 1) - 1
 */
/* ---------------------------- end of math proof --------------------------- */
/**
 * -[] with the height you can calculate the last internal element by the
 * sum from k=0 to k=h of d^k. This is a geometric sum so it ends up being
 * (1 - d^h)/(1-d)
 *
 * time complexity:
 * O(1)
 *
 *
 *[x] void exch(int i, int j)     (exchange references in heap/pq and
 * inversemap/qp in such a way that it corresponds to swapping items on the
 * heap)
 *
 * strategy:
 * -[x] do inversemap/qp first: swap qp[pq[i]] = j and qp[pq[j]] = i
 * -[x] heap/pq is super straightforward (swap with temp)
 *
 * time complexity:
 * O(1)
 *
 *
 *[x] int[] getChildrenIndices(int k) (given index on heap find all children)
 *
 * strategy:
 * -[x] the formula is: d*(i-1) + 2 for the first child
 * (range up to d*(i-1) + 2 + (d-1))
 * Math here checks out:
 */
// eslint-disable-next-line max-len
/** https://stackoverflow.com/questions/41432323/formula-for-index-of-a-children-of-a-node-in-a-d-ary-heap
 * Same as with binary, you have to think about each row containing the children
 * of the previous row you end up with the first item (1-indexed item) in each
 * row (0-indexed rows) being:
 * 1 + Sigma_0_r(d^k) which using the geometric series you can show gives you
 * 1 + (1 - d^r)/(1 - d)
 * You can then rewrite this using the first item of the previous row
 * (basically inductively) and you end up with the equation above
 *
 * time complexity:
 * O(1)
 *
 *
 *
 *[x] int getParentIndex(int k)       (given index on heap find parent given
 * degree)
 *
 * strategy:
 * -[x] this is basically the inverse of the first child (but using floor to
 * deal with all children):
 * floor((i-2)/d + 1)
 *
 * time complexity:
 * O(1)
 *
 * //TODO: is this a bit too ambiguous? Is there a better structure/name for
 * this?
 *[x] boolean compare(int i, int j)    (independent of min or max heap return
 *   true if item at i should be swapped with item j)
 *
 * strategy:
 * -[x] for min heap if item_i < item_j return true. else return false
 * -[x] for max heap if item_i > item_j return true. else return false
 * -[x] deal with custom Comparable objects having isLessThan
 *
 * time complexity:
 * O(1)
 *
 *
 *[x] boolean isEmpty()             (is the priority queue empty?)
 *
 * strategy:
 * -[x] just use the heap size variable
 *
 * time complexity:
 * O(1)
 */

// eslint-disable-next-line max-len
const HEAP_INDICES_OUT_OF_RANGE_ERROR = 'The indices given are not in bounds. NOTE: Heap is 1-indexed.';
/**
 * @description define an interface for comparable objects
 * methods based off of ecmascript spec
 */
interface Comparable<T> {
    isLooselyEqual: (value: T) => boolean;
    isStrictlyEqual: (value: T) => boolean;
    isLessThan: (value: T) => boolean;
}

class IndexDPQ<Item extends Comparable<Item> | number | string | bigint> {
  private pq: number[];

  private qp: number[];

  private items: Item[];

  private arraysSize: number;

  private numberOfItemsInHeap: number = 0;

  private D: number = 2;

  private max: boolean;

  constructor(initialArraysSize: number, D: number, max: boolean = true) {
    this.arraysSize = initialArraysSize;
    this.D = D;
    this.max = max;
    this.pq = new Array(initialArraysSize).fill(-1);
    this.qp = new Array(initialArraysSize).fill(-1);
    this.items = new Array(initialArraysSize).fill(null);
  }

  private isEmpty(): boolean {
    return this.numberOfItemsInHeap === 0;
  }

  // TODO: should invoker of compare check for inbounds indices or
  // should compare?
  private compare(i: number, j: number): boolean {
    /**
      * check if i and j are in bounds (if they have a non -1 value in pq
      * there is no reason that they will have a null value in items)
      * //TODO: test this
      */
    if (this.pq[i] > 0 && this.pq[j] > 0) {
      const item1: Item = this.items[this.pq[i]];
      const item2: Item = this.items[this.pq[j]];
      // TODO: confirm that you cannot end up in a situation where item1
      // and item 2 are of different types
      if (typeof item1 === 'number'
        || typeof item1 === 'string'
        || typeof item1 === 'bigint') {
        /**
         * logical XOR (e.g. minHeap aka max is false and compare(5,4) should
         * return false)
         */
        return (item1 < item2) !== this.max;
      }
      return item1.isLessThan(item2) !== this.max;
    }
    throw new Error(HEAP_INDICES_OUT_OF_RANGE_ERROR);
  }

  private getParentIndex(i: number): number {
    return Math.floor(((i - 2) / this.D) + 1);
  }

  private getChildrenIndices(i: number): Uint32Array {
    // TODO: would indices ever get to 32bits?
    const childrenIndices = new Uint32Array(this.D);
    for (let j = 0; j < this.D; j += 1) {
      childrenIndices[j] = (this.D * (i - 1)) + 2 + j;
    }
    return childrenIndices;
  }

  private exch(i: number, j: number): void {
    const item1Index = this.pq[i];
    const item2Index = this.pq[j];
    this.qp[item1Index] = j;
    this.qp[item2Index] = i;
    this.pq[i] = item2Index;
    this.pq[j] = item1Index;
  }
}

const ternaryMaxPQ = new IndexDPQ(2, 3);
const binaryMinPQ = new IndexDPQ(4, 2, false);
