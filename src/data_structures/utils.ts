// eslint-disable-next-line max-len
const INDEX_TOO_HIGH = 'Index is greater than the number of items NOTE: arrays are 1-indexed.';
// eslint-disable-next-line max-len
const INDEX_TOO_LOW = 'Index is lower than 1 NOTE: arrays are 1-indexed.';
// eslint-disable-next-line max-len
const COMPARISON_FAILED = 'ERROR: Comparison failed';
// eslint-disable-next-line max-len
const INITIAL_NUMBER_OF_ITEMS_TOO_SMALL = 'ERROR: initialNumberOfItems must be at least 0';
// eslint-disable-next-line max-len
const INVALID_CONSTRUCTOR_OUT_OF_SYNC = 'ERROR: Invalid constructor. When providing an array, either do not provide an initialNumberOfItems or match it to the array\'s length.';
// eslint-disable-next-line max-len
const INVALID_CONSTRUCTOR_MISSING_ARGUMENTS = 'ERROR: Invalid constructor. Please provide an initialNumberOfItems or an array to seed the priority queue.';
// eslint-disable-next-line max-len
const NO_ROOT_TO_DELETE = 'ERROR: Heap is empty. No root present to be deleted.';
// eslint-disable-next-line max-len
// const NO_ROOT = 'ERROR: Heap is empty. No root present.';
// eslint-disable-next-line max-len
const NO_ITEM_TO_CHANGE = 'ERROR: There is no Item at provided items\' index';
// eslint-disable-next-line max-len
const DEGREE_TOO_LOW = 'ERROR: your degree (maximum amount of subtrees per node) is too low';

export {
  INDEX_TOO_HIGH,
  INDEX_TOO_LOW,
  COMPARISON_FAILED,
  INITIAL_NUMBER_OF_ITEMS_TOO_SMALL,
  INVALID_CONSTRUCTOR_MISSING_ARGUMENTS,
  INVALID_CONSTRUCTOR_OUT_OF_SYNC,
  NO_ROOT_TO_DELETE,
  NO_ITEM_TO_CHANGE,
  DEGREE_TOO_LOW,
};
