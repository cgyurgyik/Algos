/* eslint linebreak-style: ["error", "unix"] */

// TODO: once everything is finalized go through and clean up variable names in
// documentation
// I don't love the name keys for the items array. values is kind of vague too
// items might be better

// TODO: implement a hashmap for items. In Sedgwick, the delete method does not
// swap positions on the items array and instead appears to just leave -1s
// everywhere which does not seem ideal. On the other hand, if delete swaps
// items in the items array, their indices change, so delete(int k) would
// require client to somehow track the indices (which seems unreasonable).
// We should be able to get around this with a hashmap

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
/**
 * FROM SEDGEWICK:
 * A useful way of thinking of this data type is as implementing an array, but
 * with fast access to the smallest entry in the array. It actually does even
 * better, giving fast access to the minimum entry in a specified subset of an
 * array's entries (the ones that have been inserted). In other words, you can
 * think of an IndexMinPQ named pq as representing a subset of an array
 * pq[0..N-1] of items. Think of the call pq.insert(i, key) as adding i to the
 * subset and setting pq[i] = key and the call pq.changeKey(i, key) as setting
 * pq[i] = key, both maintaining the data structures needed to support the
 * other operations, most importantly delMin() (remove and return the index of
 * the maximum key) and changeKey() (change the item associated with an index
 * that is already in the data structure - just as in pq[i] = key). When an
 * item in the heap changes, we can restore the heap invariant with a sink
 * operation (if the key decreases) and a swim operation (if the key increases).
 * To perform the operations, we use the index to find the item in the heap.
 * The ability to locate an item in the heap also allows us to add the delete()
 * operation to the API.
 */
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
 * (create a priority queue with initial capacity initialArraysSize, using a
 * d-ary tree/heap,
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
 * need, the size of the arrays (initialized by initialArraysSize), and the
 * number of elements in the heap
 *
 * time complexity:
 * O(1)
 *
 *[] IndexDPQ(Item[] array, int D, boolean max = true)
 * (create a priority queue building the pq from an existing array, using a
 * d-ary tree/heap, maxpq if max == true otherwise minpq)
 *
 * strategy:
 * -[] look at the passed in array's length and use that to determine the
 * size of heap/pq, inversemap/qp
 * -[] set keys/values/items array to the passed in Item array
 * //TODO: compare inserting every item into the heap versus the other way
 * -[] fill out heap/pq and inversemap/qp
 * -[] find last element in heap that isn't a leaf (findLastInternal)
 * -[] while you aren't out of bounds (heap index > 0) iterate backwards
 * through heap
 * -[] sink item at current position
 *
 * time complexity:
 * // TODO: check that nothing changes for a D != 2
 * - this one is actually important to understand more in depth. On first
 * glance, since the last non-leaf is around size()/degree it's easy to think
 * that building the heap takes O(N*ln(N)) since each sink is O(ln(N)). This is
 * in fact not a tight bound. The intuitive reason is that at the level right
 * above the leaves, you only have to compare once to get to the bottom. So at
 * that level you have a constant compare time, but order N nodes (N / D) to
 * deal with. Whereas, if you look at the root node, in the worst case you have
 * to do order of log_d(N) aka O(ln(N)) compares to get to the bottom, but you
 * only have a constant (1) nodes to deal with. If you do the precise
 * mathematical analysis you can bound the sum you get with the geometric sum,
 * and that allows you to get a tight bound of:
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
 *void insert(int k, Item item) (insert item; associate it with k)
 * NOTE: k refers to the index in keys array.
 * //TODO: figure out why you wouldn't just always insert at last index in keys
 * won't keys' length be the same as the heap's/pq's length always?
 *
 *
 * strategy:
 * -[] make sure that you don't have a key at index k in keys array
 *
 * -[] check to see if you can fit another Item in arrays. if not rebuild the
 *  arrays with double the space
 * -[] add the Item at the end of the key's array
 * -[] point the next unfilled element of the heap (pq) to the newly added Item
 * -[] update the inverse map qp (map from Key/Item array index to pq index)
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
 *[x] Item deleteRoot()         (remove a minimal or maximal item and return it)
 *
 * //NOTE: Sedgwick wants the index back.
 * //TODO: confirm that this makes no sense
 * int delRoot()         (remove a minimal or maximal item and return its index)
 * I don't understand why you would ever need the index back unless
 * it is refering to the index of the items array. Even then, it should delete
 * the item from the items array as well and just return the item itself.
 *
 * strategy:
 * -[x] save values/keys[pq[1]] as well as its index in the keys array
 * -[x] call delete(1)
 * -[x] return the deleted item
 *
 * time complexity:
 * - just takes complexity of delete(int k)
 * O(ln(N))
 *
 *
 * // TODO: should i return the deleted item?
 * // WARNING: k refers to the items index not the heap index
 *[x] void delete(int k)            (remove k and its associated item)
 *
 * strategy:
 * -[x] set qp[k] to be deleted (-1)
 * -[x] swap the item on heap with the last item (using the heap size
 * property) in heap/pq
 * -[x] set pq's last item to be deleted (-1)
 * -[x] swap and delete item from keys array (note you have to be careful with
 * types here I had to avoid setting to null because that's not a valid type
 * for Item)
 * -[x] decrement heap size
 * -[x] call sink on new root
 * -[x] call swim on new root
 * -[x] first check to see if you should resize the arrays. if removing this
 * item would bring you below the 1/4 full mark, for each array create another
 * array that is half the size of the original and copy everything over.
 *
 * time complexity:
 * - resizing the array should be amortized //TODO: confirm
 * - calling sink and swim will be O(ln(N)) because if you call sink and
 * current node compares with children in such a way that you get back false
 * (e.g. min heap and children are not smaller) that's one check and then you
 * break out of sink and move onto swim. It's symmetric so calling sink first
 * or swim first shouldn't make a difference
 * O(ln(N))
 *
 *
 *
 */
/* --------------------------------- update --------------------------------- */
/**
 *[x] void change(int k, Item item) (change the item associated with k to item)
 *
 * strategy:
 * -[x] k refers to the index of keys/items. update the value keys array to the
 * item that was passed in.
 * -[x] look up position in heap/pq via qp[k]
 * -[x] call sink and swim on that position
 *
 * time complexity:
 * O(ln(N))
 */
/* ------------------------ maintenance of invariant ------------------------ */
/**
 *[x] swim(int k)               (bubble item at index k to appropriate position)
 *
 * strategy:
 * -[x] find heap/pq index of parent node
 * -[x] while parent is in bounds (if not you are already at the root)
 * -[x] compare current node with parent node
 * -[x] compare using a compare function (handle both basic values and
 * Comparables)
 * -[x] swap (exch) nodes appropriately with compare function (deal with both
 * max and min priority queues) for inversemap/qp
 * -[x] swap (exch) for heap/pq
 * -[x] leave keys/items array alone
 * -[x] break out if comparison tells you you're in the right place
 *
 * time complexity:
 * - you would at worst have to exchange floor(log_d(N)) times and swaps are
 * constant
 * O(ln(N))
 *
 *
 * [x] sink(int k)           (move item at index k down to appropriate position)
 *
 * strategy:
 * -[x] find the smallest/largest children node indices
 * -[x] while at least one child is in bounds
 * (call getChildrenIndices due to D-ary tree)
 * -[x] use the comparsion abstraction compare(Item item1, Item item2)
 * -[x] if current node is smaller/larger than the max/min of children
 * exch nodes from heap/pq and inversemap/qp
 * -[x] otherwise break out
 *
 * time complexity:
 * - this is where the degree D of the tree comes into play. You have an
 * inherent tradeoff: the more subtrees (maximum of all nodes) the smaller
 * the height of the tree and thus the fewer levels you have to sink in the
 * worst case, BUT the more subtrees(...) the more children nodes you have to
 * check to determine which is the maximum or the minimum. //TODO: do the math
 * in depth and confirm logic
 * So you would think that the best case scenario for a high degree is when
 * you swim a lot (fewer levels to swim up no comparing multiple items) and
 * sink rarely. That corresponds in practice to few deletes/updates and many
 * inserts. I guess that is a feasible situation, but one of the main
 * advantages of priority queues is the ability to quickly pop off the root
 * node, so this doesn't seem like a frequent use case.
 * O(d*log_d(N)) = O(ln(N))
 */
/* ------------------------------- inspection ------------------------------- */
/**
 *[x] Item root()                    (return a minimal or maximal item)
 *
 * strategy:
 * -[x] root will be at heap[1]/pq[1] and item will be at items[pq[0]]
 *
 * time complexity:
 * O(1)
 *
 *[x] int rootIndex()                (return a minimal or maximal item's index)
 *
 * strategy:
 * -[x] root index will be at heap[1]/pq[1] (whole point of priority queues
 * guaranteed by heap invariant)
 */
/* -------------------------------- searching ------------------------------- */
/**
 *[x] boolean contains(int k)       (is k associated with some item)
 *
 * strategy:
 * -[x] this k refers to the values/keys array i believe //TODO: confirm
 * -[x] you can use the inverse map/qp array to check this (
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
 *[x] findLastInternalNode()           (check heap and determine the position of
 * the last node that is not a leaf)
 *
 * strategy:
 */
// eslint-disable-next-line max-len
/** https://cs.stackexchange.com/questions/9914/finding-the-height-of-a-d-ary-heap
 * -[x] find the height of the d-ary tree given size(). This will be:
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
 * h = ceiling(Log_D((D - 1) * M) + 1) - 1
 */
/* ---------------------------- end of math proof --------------------------- */
/**
 * -[x] with the height you can calculate the last internal element by the
 * sum from k=0 to k=h=ceiling(Log_D((D - 1) * M + 1) - 1 of D^k.
 * This is a geometric sum so it ends up being
 * (1 - D^(h+1))/(1-D) = (1 - D^(ceiling(Log_D(D - 1) * M + 1)))/(1 - D)
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
 *
 *
 * [] void validateIndex()        (throw an exception if index is out of bounds)
 *
 * strategy:
 * -[] check if index is less than 1 or greater than the number of elements on
 * the heap
 *
 * time complexity:
 * O(1)
 */

// TODO: clean up index naming in methods (try to be consistent. maybe hi is
// heap index)
// eslint-disable-next-line max-len
const INDEX_TOO_HIGH = 'Error: Index is greater than the number of items NOTE: arrays are 1-indexed.';
// eslint-disable-next-line max-len
const INDEX_TOO_LOW = 'Error: Index is lower than 1 NOTE: arrays are 1-indexed.';
// eslint-disable-next-line max-len
const COMPARISON_FAILED = 'Error: Comparison failed';
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

  private items: (Item | null)[];

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

  private validateIndex(i: number): void {
    if (i < 1) throw Error(INDEX_TOO_LOW);
    if (i > this.numberOfItemsInHeap) throw Error(INDEX_TOO_HIGH);
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
      * // TODO: improve compare:
      * This isn't satisfying, becuase there are too many checks just to
      * make typescript happy. Really, I should only be checking that the
      * two values at pq[i] and pq[j] are greater than 0.
      */
    this.validateIndex(i);
    this.validateIndex(j);
    const item1: (Item | null) = this.items[this.pq[i]];
    const item2: (Item | null) = this.items[this.pq[j]];
    // TODO: confirm that you cannot end up in a situation where item1
    // and item 2 are of different types
    if (typeof item1 === 'number'
        || typeof item1 === 'string'
        || typeof item1 === 'bigint') {
      /**
         * logical XOR (e.g. minHeap aka max is false and compare(5,4) should
         * return false)
         */
      if (item2 !== null) return (item1 < item2) !== this.max;
    } else if (item1 !== null && item2 !== null) {
      return item1.isLessThan(item2) !== this.max;
    }
    throw new Error(COMPARISON_FAILED);
  }

  private getParentIndex(i: number): number {
    return Math.floor(((i - 2) / this.D) + 1);
  }

  // TODO: can I get away with Uint32Array here? -1 is in use but
  // only for something that doesn't exist
  private getChildrenIndices(i: number): Int32Array {
    // TODO: would indices ever get to 32bits?
    // TODO: is this just a place for a dynamic array?
    const childrenIndices = new Int32Array(this.D).fill(-1);
    for (let j = 0; j < this.D; j++) {
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

  // TODO: Find equation for last internal node that has a child
  private findLastInternalNode(): number {
    const height = Math.ceil(
      Math.log((this.D - 1) * this.numberOfItemsInHeap + 1) / Math.log(this.D),
    ) - 1;
    return (1 - (this.D ** (height + 1))) / (1 - this.D);
  }

  private contains(k: number): boolean {
    return this.qp[k] !== -1;
  }

  private rootIndex(): number {
    return this.pq[1];
  }

  private root(): (Item | null) {
    return this.items[this.pq[1]];
  }

  // TODO: make sure nothing weird can happen with undefined or null
  private sink(i: number): void {
    let currentIndex: number = i;
    let children: Int32Array = this.getChildrenIndices(currentIndex);
    while (children[0] > 0) {
      /**
       * extremeIndex here means either the index on the heap that corresponds
       * to the minimum item if you have a minHeap or a maximal item in the
       * case of a maxHeap
       */
      let extremeIndex: number = children[0];
      let j: number = 1;
      while (children[j] > 0 && children[j] !== undefined) {
        const currChildIndex: number = children[j];
        if (this.compare(currChildIndex, extremeIndex)) {
          extremeIndex = currChildIndex;
        }
        j++;
      }
      if (this.compare(extremeIndex, currentIndex)) {
        this.exch(extremeIndex, currentIndex);
        currentIndex = extremeIndex;
        children = this.getChildrenIndices(currentIndex);
      } else break;
    }
  }

  // TODO: figure out what the minimum checks are. will parentIndex ever be too
  // large (out of bounds in the other direction) for example?
  private swim(i: number): void {
    let currentIndex = i;
    let parentIndex: number = this.getParentIndex(currentIndex);
    while (parentIndex > 0) {
      if (this.compare(currentIndex, parentIndex)) {
        this.exch(currentIndex, parentIndex);
        currentIndex = parentIndex;
        parentIndex = this.getParentIndex(currentIndex);
      } else break;
    }
  }

  public change(k: number, item: Item): void {
    this.items[k] = item;
    this.sink(this.qp[k]);
    this.swim(this.qp[k]);
  }

  // TODO: revisit to see if you can skip any steps
  public delete(k: number): void {
    this.validateIndex(k);
    const swapIndex = this.qp[k];
    // swap item to be deleted with last item in items array
    this.items[k] = this.items[this.numberOfItemsInHeap];
    // just delete it from the items array immediately
    this.items[this.numberOfItemsInHeap] = null;
    /**
     * Remap pq to stay up to date with change. You could update qp first but i
     * think this is more intuitive
     */
    this.pq[this.qp[k]] = this.numberOfItemsInHeap;
    this.pq[this.qp[this.numberOfItemsInHeap]] = k;
    // Remap qp
    const temp = this.qp[k];
    this.qp[k] = this.qp[this.numberOfItemsInHeap];
    this.qp[this.numberOfItemsInHeap] = temp;
    /**
     * At this point everything should be the same, just remapped (and item is
     * deleted from items array)
     */
    /**
     * From the pov of the heap, exchange the item we wish to delete with the
     * last item in the heap
     */
    this.exch(swapIndex, this.numberOfItemsInHeap);
    // Delete item from qp and pq
    this.qp[this.numberOfItemsInHeap] = -1;
    this.pq[this.numberOfItemsInHeap] = -1;
    // Reflect deletion in count of items in heap
    this.numberOfItemsInHeap--;
    // Now sink and swim the item so that we restore the heap invariant
    this.sink(swapIndex);
    this.swim(swapIndex);
    // TODO: check thoroughly but this takes into account the 0th element
    // in the arrays. The +1 cancels out with the -1 from the deleted element
    // Finally resize the array if need be
    if ((this.numberOfItemsInHeap / this.arraysSize) <= (1 / 4)) {
      const newArraysSize = Math.ceil(this.arraysSize / 2);
      const newPQ = new Array(newArraysSize).fill(-1);
      const newQP = new Array(newArraysSize).fill(-1);
      const newItems = new Array(newArraysSize).fill(null);
      for (let i = 0; i < this.numberOfItemsInHeap; i++) {
        newPQ[i] = this.pq[i];
        newQP[i] = this.qp[i];
        newItems[i] = this.items[i];
      }
      this.pq = newPQ;
      this.qp = newQP;
      this.items = newItems;
    }
  }

  public deleteRoot(): (Item | null) {
    const rootItem = this.items[this.pq[1]];
    this.delete(1);
    return rootItem;
  }
}

const ternaryMaxPQ = new IndexDPQ(2, 3);
const binaryMinPQ = new IndexDPQ(4, 2, false);
