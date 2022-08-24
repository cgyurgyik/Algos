#include <stdlib.h>
#include <stdio.h>
/**
 * @brief We are looking for the node with the smallest value larger than the target
 * 
 * @return int 
 */

// define struct for a TreeNode
// build out a test tree and target

// check passed in target node to see if it has a right
//  if it does, then keep going left till you hit NULL. The leftmost non-null node is the inorder successor

// if the target not does not have a right child, then we have to traverse the tree
//  base case: you found the target node, return to the previous execution context
//  if not at the node, compare current root with target:
  // if current root is greater than the


typedef struct TreeNode {
  int val;
  struct TreeNode *right;
  struct TreeNode *left;
} TreeNode;

// define a function that will find minimum non Null node
TreeNode *findMin(TreeNode *node) {
  while (node->left) {
    node = node->left;
  }
  return node;
}

// find the target node
TreeNode *findSuccessor(TreeNode *root, TreeNode *target) {
  // BASE CASE:
  if (root->val == target->val) {
    // return NULL we will use this as a flag to check if we have found the inorder successor
    return (TreeNode *)NULL;
  }
  // RECURSIVE CASE:
  // Traverse
  TreeNode *result;
  if (root->val > target->val) {
    result = findSuccessor(root->left, target);
  }
  else if (root->val < target->val) {
    result = findSuccessor(root->right, target);
  }
  // At this point, the target value has been found (we assume it is present in the tree)
  // this means that we are popping execution contexts off the stack and so we want to check
  // for the first stack whose value is greater than the target's
  if (!result && (root->val > target->val)) {
    result = root;
  }
  return result;
}

int main(void) {
  // check if current node has a right child. if it does the min of that child's subtree will be
  // the inorder succesor
  if (node->right) {
    return findMin(node->right);
  }
  // otherwise we need to traverse the tree and find the successor
  return findSuccessor(root, node);
}