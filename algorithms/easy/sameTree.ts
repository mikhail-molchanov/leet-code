/**
 * Problem description:
 * https://leetcode.com/problems/same-tree/
 */

import { TreeNode } from '../../shared/utils';

// Algorithm:
// Compare tree nodes on the same level recursively.
export function isSameTree(tree1: TreeNode | null, tree2: TreeNode | null): boolean {
  if (tree1 && tree2) {
    // On any level sub-trees are equal when both values, left and right parts are equal.
    return (
      tree1.val === tree2.val &&
      isSameTree(tree1.left, tree2.left) &&
      isSameTree(tree1.right, tree2.right)
    );
  } else if (!tree1 && !tree2) {
    // Empty leafs are equal.
    return true;
  } else {
    // Either of the sub-nodes is null while another one is not null => trees are not equal.
    return false;
  }
}
