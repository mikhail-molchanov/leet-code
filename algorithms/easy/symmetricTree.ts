/**
 * Problem description:
 * https://leetcode.com/problems/symmetric-tree/
 */

import { TreeNode } from '../../shared/utils';

// The algorithm is very similar to "Same Tree". The order of comparison is just reverted.
export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }

  return isSymmetricTrees(root.left, root.right);
}

const isSymmetricTrees = (tree1: TreeNode | null, tree2: TreeNode | null): boolean => {
  if (tree1 && tree2) {
    // On any level sub-trees are symmetric when both values are equal and left and right parts are symmetric.
    return (
      tree1.val === tree2.val &&
      isSymmetricTrees(tree1.left, tree2.right) &&
      isSymmetricTrees(tree1.right, tree2.left)
    );
  } else if (!tree1 && !tree2) {
    // Empty leafs are symmetric.
    return true;
  } else {
    // Either of the sub-nodes is null while another one is not null => trees are not equals and thus are not symmetric.
    return false;
  }
};
