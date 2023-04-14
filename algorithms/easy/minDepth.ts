/**
 * Problem description:
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/
 */

import { TreeNode } from './utils';

// Option1: recursive, not optimized.
export function minDepth(node: TreeNode | null): number {
  if (!node) {
    return 0;
  }

  const left = minDepth(node.left);
  const right = minDepth(node.right);

  // We should exclude zeros from computations.
  return Math.min(left || right, right || left) + 1;
}

// Option2: iterative (level by level until first leaf is detected).
export function minDepth2(root: TreeNode | null): number {
  if (!root) {
    return 0;
  }

  // Pre-populate the queue with root node.
  const queue: [TreeNode, number][] = [[root, 1]];

  while (true) {
    // According to algorithm the queue MUST NOT BE EMPTY here.
    // Because down below we either quit or add more entries to the queue.
    const entry = queue.shift()!;

    const [node, level] = entry;
    if (!node.left && !node.right) {
      return level;
    }

    if (node.left) {
      queue.push([node.left, level + 1]);
    }

    if (node.right) {
      queue.push([node.right, level + 1]);
    }
  }
}
