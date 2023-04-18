/**
 * Problem description:
 * https://leetcode.com/problems/balanced-binary-tree/
 */

import { TreeNode } from '../../shared/utils';

// Algorithm (recursive, for every node):
// - if node is null it's balanced by definition and it's depth is 0
// - get depth and balanced flag of left child
// - get depth and balanced flag of right child
// - if any of them is not balanced => end of algorithm
// - if depth difference between them is greater than 1 => node is not balanced by definition
export function isBalanced(node: TreeNode | null): boolean {
  const traverse = (node: TreeNode | null): [boolean, number] => {
    if (!node) {
      return [true, 0];
    }

    const [leftBalanced, leftDepth] = traverse(node.left);

    // Abort early of one of the children is not balanced.
    if (!leftBalanced) {
      return [false, 0];
    }

    const [rightBalanced, rightDepth] = traverse(node.right);

    if (!rightBalanced || Math.abs(leftDepth - rightDepth) > 1) {
      return [false, 0];
    }

    return [true, 1 + Math.max(leftDepth, rightDepth)];
  };

  const [balanced] = traverse(node);

  return balanced;
}
