/**
 * Problem description:
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 */

import { TreeNode } from './utils';

export function maxDepth(node: TreeNode | null, level = 0): number {
  if (!node) {
    return level;
  }

  level++;

  return Math.max(maxDepth(node.left, level), maxDepth(node.right, level));
}

// Alternative without passing the "level" parameter.
export function maxDepth2(node: TreeNode | null): number {
  if (!node) {
    return 0;
  }

  return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1;
}
