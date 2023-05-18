/**
 * Problem description:
 * https://leetcode.com/problems/recover-binary-search-tree/
 */

import { TreeNode } from '../../shared/utils';

// Intuition:
// - There is a way to traverse BST so that the path forms sorted sequence (inorder).
// - So basically we can consider this task as identifying 2 swapped elements of sorted list.
//
// Steps:
// - Traverse the tree so that on each step next value should be greater than previous.
// - Identify nodes that were swapped, they will be defects in the sequence.
// - Swapping node values in place.
export function recoverTree(root: TreeNode | null): void {
  const defects = findDefects(root);

  if (defects.length) {
    const [x, y] = defects;
    const temp = x.val;
    x.val = y.val;
    y.val = temp;
  }
}

// Find exactly two nodes that form defects in the sorted sequence.
function findDefects(root: TreeNode | null) {
  let result: TreeNode[] = [];

  // Traverse the tree in order.
  const iterator = traverse(root);
  let { value, done } = iterator.next();

  // This flag is set when we're sure that boh defects are detected.
  let stop = false;

  // We need to maintain previously visited value on each step.
  let prev: TreeNode | undefined = undefined;

  // This is an optimization that allows to identify defects that appear next to each other.
  // If we already have pair of defect candidates and on some step we see
  // that current value from the tree is greater that both candidates it means that
  // there will be no mode candidates going further. This is a side-effect of task description.
  // Give it a thought, might not kick in immediately.
  let maxDefect = Number.MAX_SAFE_INTEGER;

  // Visit each tree node in ascending order.
  while (value && !done && !stop) {
    // If a pair of prev/current value are not sorted => they both are potential defect candidates.
    if (prev && prev.val > value.val) {
      // Remember max value of defect candidates.
      maxDefect = Math.max(prev.val, value.val);

      // If we already have another pair of candidates, then defects are
      // first one from the first pair and second one from second pair.
      // Again, this fact might not be obvious from the first glance.
      if (result.length) {
        result = [result[0], value];
        stop = true;
      } else {
        // If it's a first occurrence of misformed nodes => mark them as candidates.
        result = [prev, value];
      }
    }

    // Remember previous value and move to the next node.
    prev = value;
    ({ value, done } = iterator.next());

    // Optimization: if next value is greater than max of defect candidates => they are real defects.
    // We're not gonna see any more defects going further since otherwise current pair of defects could
    // not be resolved by swapping exactly 2 nodes.
    if (value && maxDefect < value.val) {
      stop = true;
    }
  }

  return result;
}

// In order BST traversal.
// Each call of this function should return next element in the sequence.
// Good case for using generators.
function* traverse(node: TreeNode | null): Generator<TreeNode, undefined> {
  if (!node) {
    return;
  }

  const { left, right } = node;

  if (left) {
    yield* traverse(left);
  }

  yield node;

  if (right) {
    yield* traverse(right);
  }
}
