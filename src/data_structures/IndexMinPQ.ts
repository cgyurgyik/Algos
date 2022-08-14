/**
 * @description define an interface for comparable objects
 * methods based off of ecmascript spec
 */
interface Comparable<T> {
    isLooselyEqual(value: T): boolean;
    isStrictlyEqual(value: T): boolean;
    isLessThan(value: T, leftFirst?: boolean): boolean;
}

// TODO: make a generic indexPQ that can be either min or max
// TODO: make this work for non-binary trees (D-ary with D > 1)
// TODO: make it so you can actually use comparable, number, bigint, and string. initial thought is to just union
// Key extends Comparable<key> but i don't think that that works
class IndexMinPQ<Key extends Comparable<Key> | number | bigint | string> {
    // pq holds indices that correspond to keys in keys array. pq[0] is empty so 1 indexed
    private pq: number[];      
    // qp gives the position of i in pq[] (the index j s.t. pq[j] is i. -1 if not found)
    // it is the inverse of pq and its indices correspond to the keys indices. it stores where in the heap
    // the Key with index i is stored. Also 1 indexed
    private qp: number[];
    // keys just stores Key objects in an array in the order that they are added. also one indexed
    private keys: Key[];
    // arraySize is the size passed into the constructor that will determine initial array size (can be resized later)
    private arraySize: number;
    // N is the size of the heap (number of 'nodes'/keys on the priority queue)
    private pqSize: number = 0;

    constructor(initialArraySize: number) {
        // TODO: look into performance of fill and whether to use null or -1
        this.arraySize = initialArraySize;
        this.pq = new Array(initialArraySize).fill(null);
        this.qp = new Array(initialArraySize).fill(null);
        this.keys = new Array(initialArraySize).fill(null);
    }
    //TODO: add constructor that takes in an array and builds an indexed min PQ from it

    /* -------------------------------------------------------------------------- */
    /*                              HELPER FUNCTIONS                              */
    /* -------------------------------------------------------------------------- */
    /**
     * @description less compares two comparable keys and determines if the first is less than the second.
     * it should be generic and leverage the Comparable interface.
     * @param key1 
     * @param key2 
     * @returns boolean true if key1 is less than key 2
     */
    private less(key1: Key, key2: Key): boolean {
        // TODO: make this work with number, bigint and string which don't have isLessThan
        if (typeof key1 === "number" || typeof key1 === "string" || typeof key1 === "bigint") {
            return key1 < key2;
        }
        return key1.isLessThan(key2);
    }

    // TODO: try to make this a little easier to follow
    private swim(i: number): void {
        while (Math.floor(i / 2)) {
            const parentIndex = Math.floor(i / 2);
            // swap curr with parent if it is smaller
            if (this.less(this.keys[this.pq[i]],this.keys[this.pq[parentIndex]])) {
                // swap qp
                const tempqpIndex = this.qp[this.pq[i]];
                this.qp[this.pq[i]] = this.qp[this.pq[parentIndex]];
                this.qp[this.pq[parentIndex]] = tempqpIndex;
                // swap pq
                const temppqIndex = this.pq[i];
                this.pq[i] = this.pq[parentIndex];
                this.pq[parentIndex] = temppqIndex;
                i = parentIndex;
            } else break;
        }
    }

    public insert(i: number, key: Key): void {
        // resize (double array size) pq, qp, and keys if adding another key would go out of bound
        if (this.pqSize + 1 === this.arraySize) {
            // TODO: confirm that this is amortized
            const pqResized = new Array(this.arraySize * 2).fill(null);
            // copy over pq values to new pq array that is double the size
            for (let j = 1; j <= this.pqSize; j++) {
                pqResized[j] = this.pq[j];
            }
            this.pq = pqResized;
            // update arraySize
            this.arraySize = this.arraySize * 2;
        }
        
        this.pq[this.pqSize + 1] = i;   // insert (index to) key at the end of the pq
        this.qp[i] = this.pqSize + 1;   // update qp for reverse lookup
        // TODO: The book says this.keys[i] = key, by what happens here if your i isn't your 
        // last element in keys? overriding?
        // wouldn't everything break in that case? what even is the point of the i if we are inserting at the
        // end of the pq and swimming up? Unless I'm missing something, i would set this.keys[this.pqSize + 1] = key
        // and get rid of the i. Inserting in the middle of keys doesn't make sense to me
        this.keys[i] = key;
        this.swim(this.pqSize + 1);
        this.pqSize++; 
    }
}




class ComparableObject {
    first: number;
    second: number;
    constructor(value1: number, value2: number) {
        this.first = value1;
        this.second = value2;
    }
    isLooselyEqual(objToCompare: ComparableObject) {
        return this.first == objToCompare.first && this.second == objToCompare.second;
    }
    isStrictlyEqual(objToCompare: ComparableObject) {
        return this.first === objToCompare.first && this.second === objToCompare.second;
    }
    isLessThan(objToCompare: ComparableObject, leftFirst = true) {
        if (leftFirst) {
            return this.first + this.second < objToCompare.first + objToCompare.second;
        } else return objToCompare.first + objToCompare.second < this.first + this.second;
    }
}

class NotComparable {
    first: number;
    second: number;
    constructor(value1: number, value2: number) {
        this.first = value1;
        this.second = value2;
    }
    notAComparison(objToCompare: NotComparable) {
        console.log('not comparing that sorry');
    }
}


const comparable1 = new ComparableObject(10, 2);
const comparable2 = new ComparableObject(3, 4);
const comparable3 = new ComparableObject(1, 1);
const comparable4 = new ComparableObject(12, 33);
const comparable5 = new ComparableObject(7, 0);

const indexMinPQ = new IndexMinPQ<ComparableObject>(2);
indexMinPQ.insert(1, comparable1);
indexMinPQ.insert(2, comparable2);
indexMinPQ.insert(3, comparable3);
indexMinPQ.insert(4, comparable4);
indexMinPQ.insert(5, comparable5);

const indexMinPQNumber = new IndexMinPQ<number>(2);
indexMinPQNumber.insert(1, 5);
indexMinPQNumber.insert(2, 4);
indexMinPQNumber.insert(3, 7);
indexMinPQNumber.insert(4, 10);

// const notComparable1 = {value1: 1, value2: 2};
// const notComparable2 = {value1: 3, value2: 4};
// const indexMinPQNotComparable = new IndexMinPQ<NotComparable>;
