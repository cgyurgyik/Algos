//TODO: once everything is finalized go through and clean up variable names in
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
 * - Sedgwick suggests returning -1 for indices when an item isn't found. I don't
 * - mind this, but for the actual items array (values/keys)
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
 * O(1) another benefit of this setup. in a regular heap, you would have to traverse
 * which would be O(log(N)) //TODO: confirm
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
 *[] int[] getChildrenIndices(int k) (given index on heap find all children)
 * 
 * strategy:
 * -[] the formula is: d*(i-1) + 2 for the first child (range up to d*(i-1) + 2 + (d-1))
 * Math here checks out:
 * https://stackoverflow.com/questions/41432323/formula-for-index-of-a-children-of-a-node-in-a-d-ary-heap
 * Same as with binary, you have to think about each row containing the children of the previous row
 * you end up with the first item (1-indexed item) in each row (0-indexed rows) being:
 * 1 + Sigma_0_r(d^k) which using the geometric series you can show gives you 1 + (1 - d^r)/(1 - d)
 * You can then rewrite this using the first item of the previous row (basically inductively) and you
 * end up with the equation above
 *
 * time complexity:
 * O(1)
 * 
 * 
 *  
 *[] int getParentIndex(int k)       (given index on heap find parent given degree)
 *
 * strategy:
 * -[] this is basically the inverse of the first child (but using floor to deal with all children):
 * floor((i-2)/d + 1)
 * 
 * time complexity:
 * O(1)
 * 
 * //TODO: is this a bit too ambiguous? Is there a better structure/name for this? 
 *[] boolean compare(int i, int j)    (independent of min or max heap return true if item at i should
 *   be swapped with item j)
 * 
 * strategy:
 * -[] for min heap if item_i < item_j return true. else return false
 * -[] for max heap if item_i > item_j return true. else return false
 * -[] deal with custom Comparable objects having isLessThan
 * 
 * time complexity:
 * O(1)
 *
 * 
 *[] boolean isEmpty()             (is the priority queue empty?)
 * 
 * strategy:
 * -[] just use the heap size variable
 * 
 * time complexity:
 * O(1)
 * 
 * 
 *[] int size()                    (number of items in the priority queue)
 * 
 * strategy:
 * -[] just return the heap size variable
 * 
 * time complexity:
 * O(1)
 */
/* -------------------------------- heapsort -------------------------------- */
/**
 * Item[] sortdown()             (returns the sorted list of items using heapsort)
 */
   