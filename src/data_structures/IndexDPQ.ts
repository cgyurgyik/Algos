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
 * - mostly based off of Sedgwick textbook so naming conventions usually follow
 */

/* -------------------------------------------------------------------------- */
/*                    COMPARISON TO REGULAR PRIORITY QUEUE                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                APPLICATIONS                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */
/* ------------------------------ constructors ------------------------------ */
/**
 *[] IndexDPQ(int maxN, int D, boolean max = true)    
 * (create a priority queue with initial capacity maxN, using a d-ary tree/heap,
 *  maxpq if max == true otherwise minpq)
 *  
 *[] IndexDPQ(Item[] array, int D, boolean max = true)    
 * (create a priority queue building the pq from an existing array, using a d-ary
 *  tree/heap, maxpq if max == true otherwise minpq)
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
 * - O(log_d(N)) = O(ln(N) 
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
 * - O(ln(N))
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
 * - O(d*log_d(N)) = O(ln(N))
 */
/* --------------------------------- utility -------------------------------- */
/**
 *[] void exch(int i, int j)     (exchange references in heap/pq and
 * inversemap/qp in such a way that it corresponds to swapping items on the heap)
 *
 * strategy:
 * -[] do inversemap/qp first: swap qp[pq[i]] = j and qp[pq[j]] = i
 * -[] heap/pq is super straightforward (swap with temp)
 *
 * time complexity:
 * O(1)
 *
 * 
 *[] getParentIndex(int k)       (given index on heap find parent given degree)
 *
 * strategy:
 * -[] 
 * 
 * 
 * 
 * 
 * getChildrenIndices
 * compare
 */


/** 
 * void change(int k, Item item) (change the item associated with k to item)
 * 
 * boolean contains(int k)       (is k associated with some item)
 * 
 * void delete(int k)            (remove k and its associated item)
 * 
 * Item min()                    (return a minimal item)
 * 
 * int minIndex()                (return a minimal item's index)
 * 
 * int delMin()                  (remove a minimal item and return its index)
 * 
 * boolean isEmpty()             (is the priority queue empty?)
 * 
 * int size()                    (number of items in the priority queue)
 */ 
/* -------------------------------- heapsort -------------------------------- */
/**
 * Item[] sortdown()             (returns the sorted list of items using heapsort)
 */
