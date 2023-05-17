/**
 * Problem description:
 * https://leetcode.com/problems/validate-binary-search-tree/
 */

import { TreeNode } from '../../shared/utils';

// Algorithm:
// - Traverse the tree recursively
// - For each node we need to know the "min" and "max" range it must fall into.
// - When we go left then by definition all nodes below it should be less that it's value =>
//     - Use max = node value
//     - Use passed "min" value since going left doesn't add any limitations to the "min" value
// - When we go right then by definition all nodes below it should be greater that it's value =>
//     - Use min = node value
//     - Use passed "max" value since going right doesn't add any limitations to the "max" value.
export function isValidBST(
  root: TreeNode | null,
  // For root node "min" and "max" are gonna be undefined.
  min: number | undefined = undefined,
  max: number | undefined = undefined
): boolean {
  // Empty node is valid.
  if (!root) {
    return true;
  }

  const { left, right, val } = root;

  // Check whether node's values falls into allowed range (if it's boundaries are defined).
  if (min !== undefined && val <= min) {
    return false;
  }

  if (max !== undefined && val >= max) {
    return false;
  }

  // Repeat recursively for the left and right sub-trees with adjusted "min" and "max" values (see algorithm description).
  return isValidBST(left, min, val) && isValidBST(right, val, max);
}
