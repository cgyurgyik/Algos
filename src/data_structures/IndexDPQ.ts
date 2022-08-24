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
 *[] IndexDPQ(int initialNumberOfItems, int D, boolean max = true)
 * (create a priority queue with initial capacity initialNumberOfItems, using a
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
 * need, the size of the arrays (initialized by initialNumberOfItems), and the
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
 * // NOTE: k refers to the index in keys array.
 * // NOTE: after much thought, I have decided that it doesn't make
 * much sense to insert an item at an index:
 * If you don't insert at the end of the items list, you will be
 * overwriting which would either just be considered an update, or
 * if you really wanted to squeeze something in without clobbering
 * what is there, it would require a heap rebuild as far as I can tell
 * which would make the worst case time complexity O(n).
 * This may have been built this way because the Sedgwick implementation
 * of deletion leaves 'holes' in the items array. I aim to fix that though.
 *
 * [x] void insert(Item item)  (insert an item and add it to the priority queue)
 * strategy:
 * -[x] check to see if you can fit another Item in arrays. if not rebuild the
 *  arrays with double the space
 * -[x] increment the heap/pq size property
 * -[x] add the Item at the end of the items array
 * -[x] point the next unfilled element of the heap (pq) to the newly added Item
 * -[x] update the inverse map qp (map from items array index to pq index)
 * -[x] swim the last element in pq
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
// TODO: clean up returning null versus throwing error when getting items and
// root. Should be consistent. Also, check that we're returning copies always
// TODO: Think about this: 'For big heaps and using virtual memory, storing
// elements in an array according to the above scheme is inefficient:
// (almost) every level is in a different page. B-heaps are binary heaps
// that keep subtrees in a single page, reducing the number of pages accessed
//  by up to a factor of ten.'
import {
  INDEX_TOO_HIGH,
  INDEX_TOO_LOW,
  COMPARISON_FAILED,
  INITIAL_NUMBER_OF_ITEMS_TOO_SMALL,
  INVALID_CONSTRUCTOR_OUT_OF_SYNC,
  INVALID_CONSTRUCTOR_MISSING_ARGUMENTS,
  NO_ROOT_TO_DELETE,
  NO_ITEM_TO_CHANGE,
  DEGREE_TOO_LOW,
} from './utils'

/**
 * @description define an interface for comparable objects
 * methods based off of ecmascript spec. Kept isLooselyEqual
 * and isStrictlyEqual, since we use them in compare to not swap
 * with equal values (more intuitive).
 * // NOTE: added clone function to return copy of Item instead
 * of reference (we don't want client to modify value of Item
 * without going through the change method). Given that typescript
 * doesn't allow for multiple constructors, I didn't want to force
 * Items to have a clone constructor (where you pass in an instance
 * and it creates a new instance with the same properties).
 */
interface Comparable<T> {
    isLessThan: (value: T) => boolean;
    isLooselyEqual: (value: T) => boolean;
    isStrictlyEqual:(value: T) => boolean;
    clone: () => T;
}

type IndexDPQProps<T> = {
  'D': number,
  'max': boolean,
  'initialNumberOfItems'?: number,
  'array'?: T[],
}
// TODO: revisit iterator at some point
class IndexDPQ<Item extends Comparable<Item> | number | string | bigint> {
  // TODO: consider creating getters for pq, qp, and items (iterator?)
  // NOTE: Definite Assignment Assertions
  private pq!: number[];

  private qp!: number[];

  private items!: (Item | null)[];

  private arraysSize!: number;

  private numberOfItemsInHeap: number = 0;

  private D: number = 2;

  private max: boolean;

  // TODO: Users passing in objects will have references to them and be able to
  // modify them without heap knowing. Is it worth copying in order to protect
  // heap. Probably not. That's user error
  // TODO: is there a limit on how large the initial arrays size should be?
  constructor(props: IndexDPQProps<Item>) {
    const {
      D, max, initialNumberOfItems, array,
    } = props;
    // NOTE: Degree D is allowed to be greater than the lengths of array or
    // initialNumberOfItems
    if (D < 1) throw new Error(DEGREE_TOO_LOW);
    this.D = D;
    this.max = max;
    if (array !== undefined) {
      // either initialNumberOfItems is in sync with array.length or
      // construct heap from array
      if ((initialNumberOfItems !== undefined)
      && (initialNumberOfItems !== array.length)) {
        throw Error(`ERROR: ${INVALID_CONSTRUCTOR_OUT_OF_SYNC}`);
      }
      this.buildHeap(array);
    } else if (initialNumberOfItems === undefined) {
      throw new Error(INVALID_CONSTRUCTOR_MISSING_ARGUMENTS);
    } else if (initialNumberOfItems < 0) {
      throw new Error(INITIAL_NUMBER_OF_ITEMS_TOO_SMALL);
    } else {
      // array was not provided, and initialNumberOfItems is valid
      this.arraysSize = initialNumberOfItems + 1;
      this.numberOfItemsInHeap = 0;
      this.items = new Array(this.arraysSize).fill(null);
      this.pq = new Array(this.arraysSize).fill(-1);
      this.qp = new Array(this.arraysSize).fill(-1);
    }
  }

  // NOTE: this doesn't work because order of parameters doesn't allow for
  // passing initialNumberOfItems or array in 3rd param
  // constructor(
  //   D: number,
  //   max: boolean,
  //   initialNumberOfItems?: number,
  //   array?: Item[],
  // ) {
  //   // We want either initialNumberOfItems or array but not both
  //   if ((array !== undefined) === (initialNumberOfItems !== undefined)) {
  //     throw Error(`ERROR: ${INVALID_CONSTRUCTOR}`);
  //   }
  //   this.D = D;
  //   this.max = max;
  //   if (initialNumberOfItems !== undefined) {
  //     // TODO: is there a limit on how large the initial arrays size should be?
  //     if (initialNumberOfItems < 2) throw new Error(INITIAL_ARRAY_SIZE_TOO_SMALL);
  //     this.arraysSize = initialNumberOfItems;
  //     this.pq = new Array(initialNumberOfItems).fill(-1);
  //     this.qp = new Array(initialNumberOfItems).fill(-1);
  //     this.items = new Array(initialNumberOfItems).fill(null);
  //   } else if (array !== undefined) {
  //     // construct heap from array
  //     this.arraysSize = array.length + 1;
  //     this.items = new Array(this.arraysSize);
  //     this.items[0] = null;
  //     this.pq = new Array(this.arraysSize);
  //     this.pq[0] = -1;
  //     this.qp = new Array(this.arraysSize);
  //     this.pq[0] = -1;
  //     for (let i = 1; i < this.arraysSize; i++) {
  //       this.items[i] = array[i - 1];
  //       this.pq[i] = i;
  //       this.qp[i] = i;
  //     }
  //     // 'inductively' starting at the trivial basecase of leaf nodes,
  //     // build up heap invariant
  //     const start = this.findLastInternalNode();
  //     for (let j = start; j > 0; j--) {
  //       this.sink(j);
  //     }
  //   }
  // }

  // NOTE: Factory can't take into account generic passed in
  // static withArray(D: number, max: boolean, array: Item[]) {
  //   const indexDPQ = new IndexDPQ()<Item>;
  //   indexDPQ.D = D;
  //   indexDPQ.max = max;
  //   // construct heap from array
  //   indexDPQ.arraysSize = array.length + 1;
  //   indexDPQ.items = new Array(indexDPQ.arraysSize);
  //   indexDPQ.items[0] = null;
  //   indexDPQ.pq = new Array(indexDPQ.arraysSize);
  //   indexDPQ.pq[0] = -1;
  //   indexDPQ.qp = new Array(indexDPQ.arraysSize);
  //   indexDPQ.pq[0] = -1;
  //   for (let i = 1; i < indexDPQ.arraysSize; i++) {
  //     indexDPQ.items[i] = array[i - 1];
  //     indexDPQ.pq[i] = i;
  //     indexDPQ.qp[i] = i;
  //   }
  //   // 'inductively' starting at the trivial basecase of leaf nodes,
  //   // build up heap invariant
  //   const start = indexDPQ.findLastInternalNode();
  //   for (let j = start; j > 0; j--) {
  //     indexDPQ.sink(j);
  //   }
  // }

  private buildHeap(array: Item[]): void {
    this.arraysSize = array.length + 1;
    this.numberOfItemsInHeap = array.length;
    this.items = new Array(this.arraysSize);
    this.items[0] = null;
    this.pq = new Array(this.arraysSize);
    this.pq[0] = -1;
    this.qp = new Array(this.arraysSize);
    this.qp[0] = -1;
    for (let i = 1; i < this.arraysSize; i++) {
      this.items[i] = array[i - 1];
      this.pq[i] = i;
      this.qp[i] = i;
    }
    // 'inductively' starting at the trivial basecase of leaf nodes,
    // build up heap invariant
    const start = this.findLastInternalNode();
    for (let j = start; j > 0; j--) {
      this.sink(j);
    }
  }

  // TODO: think about when we need to return copies given that it is O(n) to
  // copy it won't change time order of growth but it's still extra work and
  // complexity here. Actually, not sure of time complexity of structuredClone
  public heapSort(): void {
    let endOfUnsorted = this.numberOfItemsInHeap;
    // while endOfUnsorted pointer is greater than 0
    while (endOfUnsorted > 1) {
      // exchange root with last unsorted item
      this.exch(1, endOfUnsorted);
      // decrement endOfUnsorted pointer
      endOfUnsorted--;
      // sink new root
      this.sink(1, endOfUnsorted);
    }
    // now you have the heap in reverse sorted order
    // TODO: check for better solution
    for (let i = 1; i <= Math.floor(this.numberOfItemsInHeap / 2); i++) {
      this.exch(i, this.numberOfItemsInHeap - i + 1);
    }
  }

  // NOTE: it probably isn't worth returning a copy if user already
  // has references to items.
  // TODO: think about shallow versus deep copy needs
  // NOTE: can't use structuredClone for target ES version
  public getItemsInHeapOrder(): (Item | null)[] {
    if (this.isEmpty()) return [];
    const orderedItems: (Item | null)[] = [];
    for (let i = 1; i <= this.numberOfItemsInHeap; i++) {
      const currItem = this.items[this.pq[i]];
      if (typeof currItem === 'number'
        || typeof currItem === 'string'
        || typeof currItem === 'bigint') {
        orderedItems.push(currItem);
      } else if (currItem === null) orderedItems.push(null);
      else {
        const copy = currItem.clone();
        orderedItems.push(copy);
      }
    }
    return orderedItems;
  }

  private validateIndex(i: number): void {
    if (i < 1) throw Error(`ERROR: index ${i}: ${INDEX_TOO_LOW}`);
    if (i > this.numberOfItemsInHeap) {
      throw Error(`ERROR: index ${i} ${INDEX_TOO_HIGH}`);
    }
  }

  // TODO: should this check this.pq[1] === -1
  public isEmpty(): boolean {
    return this.numberOfItemsInHeap === 0;
  }

  /* --------------------------------- getters ------------------------------ */
  public getHeap(): number[] {
    // return this.pq.slice();
    return this.pq.slice();
  }

  public getInverseMap(): number[] {
    return this.qp.slice();
  }

  public getItems(): (Item | null)[] {
    return this.items.slice();
  }

  public getItem(i: number): Item | null {
    this.validateIndex(i);
    const item = this.items[i];
    if (item === null) throw new Error(INDEX_TOO_HIGH);
    if (typeof item === 'number'
    || typeof item === 'bigint'
    || typeof item === 'string') {
      return item;
    }
    return item.clone();
  }

  public getNumItems(): number {
    return this.numberOfItemsInHeap;
  }

  // TODO: should invoker of compare check for inbounds indices or
  // should compare? It seems that we already might be validating
  // before calling compare. Avoid double checking
  // TODO: the position of currIndex on compare calls is inconsistent between
  // sink, swim, etc. The idea is that a true return should imply action, but is
  // there a way to make calling compare more intutitive?
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
         * // NOTE: we use <= to prevent swaps with items of equal value
         * this seems more intuitive
         */
      if (item2 !== null) return (item1 <= item2) !== this.max;
    } else if (item1 !== null && item2 !== null) {
      return (item1.isLessThan(item2) || item1.isStrictlyEqual(item2))
      !== this.max;
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

  /** // TODO: this techincally saves one more number in memory than strictly
   * necessary. I don't think that matters much at all, but if this were
   * being shipped to a lot of people, maybe i would change it
   */
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
    const levelAboveLeaves = height - 1;
    return (1 - (this.D ** (levelAboveLeaves + 1))) / (1 - this.D);
  }

  public contains(k: number): boolean {
    return this.qp[k] !== -1;
  }

  public rootIndex(): number | null {
    if (this.pq[1] === -1 || this.pq[1] === undefined) return null;
    return this.pq[1];
  }

  public root(): (Item | null) {
    const root = this.items[this.pq[1]];
    // just added root === null to satisfy typescript
    if (root === null || this.isEmpty()) return null;
    if (typeof root === 'number'
      || typeof root === 'string'
      || typeof root === 'bigint') {
      return root;
    }
    return root.clone();
  }

  // TODO: review for accuracy and optimization
  // NOTE: to allow reuse by heapsort, we add the second parameter
  // with a default. That way we can make sink stop before it hits
  // the sorted members of the array
  private sink(i: number, end: number = this.numberOfItemsInHeap): void {
    let currentIndex: number = i;
    const childrenIndices: Int32Array = this.getChildrenIndices(currentIndex);
    const validChildrenIndices: number[] = [];
    for (let j = 0; j < childrenIndices.length; j++) {
      const currChildIndex: number = childrenIndices[j];
      // TODO: consider making a function that validates but returns boolean
      // instead of throwing error when invalid
      if (currChildIndex > 0 && currChildIndex <= end) {
        validChildrenIndices.push(currChildIndex);
      }
    }
    if (validChildrenIndices.length) {
      /**
       * extremeIndex here means either the index on the heap that corresponds
       * to the minimum item if you have a minHeap or a maximal item in the
       * case of a maxHeap
       */
      let extremeIndex: number = validChildrenIndices[0];
      for (let k = 1; k < validChildrenIndices.length; k++) {
        const currChildIndex: number = validChildrenIndices[k];
        if (this.compare(currChildIndex, extremeIndex)) {
          extremeIndex = currChildIndex;
        }
      }
      // RECURSIVE CASE: a swap needs to occur and a next call to sink
      if (this.compare(extremeIndex, currentIndex)) {
        this.exch(extremeIndex, currentIndex);
        currentIndex = extremeIndex;
        this.sink(currentIndex, end);
      }
    }
  }

  // TODO: figure out what the minimum checks are. will parentIndex ever be too
  // large (out of bounds in the other direction) for example?
  private swim(i: number): void {
    const parentIndex: number = this.getParentIndex(i);
    // BASE CASES: parentIndex is out of bounds or does not compare favorably
    if (parentIndex < 1 || !this.compare(i, parentIndex)) return;
    // RECURSIVE CASE:
    this.exch(parentIndex, i);
    this.swim(parentIndex);
  }

  public change(k: number, item: Item): void {
    if (this.items[k] === undefined || this.items[k] === null) {
      throw new Error(`${NO_ITEM_TO_CHANGE}: ${k}`);
    }
    this.items[k] = item;
    this.sink(this.qp[k]);
    this.swim(this.qp[k]);
  }

  // TODO: if deleteRoot returns Item and delete is public, what is the logic
  // for not returning an Item on delete?
  // TODO: revisit to see if you can skip any steps
  // TODO: currently when you delete the last item you don't shrink the arrays
  // beyond the initial array size set upon construction. Note sure if there
  // should be a way to reset the arrays size
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
    // Finally resize the array if need be
    // TODO: make sure no floating point errors can happen
    // TODO: simplify the logic for resizing if possible
    const fullRatio = ((this.numberOfItemsInHeap + 1) / this.arraysSize);
    if (fullRatio <= 0.25) {
      const newArraysSize = Math.ceil(this.arraysSize / 2);
      this.arraysSize = newArraysSize;
      const newPQ = new Array(newArraysSize).fill(-1);
      const newQP = new Array(newArraysSize).fill(-1);
      const newItems = new Array(newArraysSize).fill(null);
      for (let i = 1; i <= this.numberOfItemsInHeap; i++) {
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
    if (this.isEmpty()) throw new Error(NO_ROOT_TO_DELETE);
    const rootItem = this.items[this.pq[1]];
    this.delete(this.pq[1]);
    return rootItem;
  }

  public insert(item: Item): void {
    // NOTE: remember that all our arrays are 1 indexed
    if ((this.numberOfItemsInHeap + 2) > this.arraysSize) {
      const newItems = new Array(2 * this.arraysSize).fill(null);
      const newPQ = new Array(2 * this.arraysSize).fill(-1);
      const newQP = new Array(2 * this.arraysSize).fill(-1);
      this.arraysSize *= 2;
      for (let i = 1; i <= this.numberOfItemsInHeap; i++) {
        newItems[i] = this.items[i];
        newPQ[i] = this.pq[i];
        newQP[i] = this.qp[i];
      }
      this.items = newItems;
      this.pq = newPQ;
      this.qp = newQP;
    }
    this.numberOfItemsInHeap++;
    this.items[this.numberOfItemsInHeap] = item;
    this.pq[this.numberOfItemsInHeap] = this.numberOfItemsInHeap;
    this.qp[this.numberOfItemsInHeap] = this.numberOfItemsInHeap;
    this.swim(this.numberOfItemsInHeap);
  }
}

// TODO: figure out how best to deal with error strings
// (export, add to class, etc)
export {
  IndexDPQ,
  Comparable,
  IndexDPQProps,
};
