/**
 * Problem description:
 * https://leetcode.com/problems/path-sum/
 */

import { TreeNode } from '../../shared/utils';

// TODO: Can it be optimized?
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) {
    return false;
  }

  const { val, left, right } = root;

  // Only stop when current node is leaf (both "left" and "right" are null).
  if (val === targetSum && !left && !right) {
    return true;
  }

  targetSum -= val;

  return hasPathSum(left, targetSum) || hasPathSum(right, targetSum);
}
