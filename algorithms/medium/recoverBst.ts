/**
 * Problem description:
 * https://leetcode.com/problems/recover-binary-search-tree/
 */

import { TreeNode } from '../../shared/utils';

// Intuition:
// - There is a way to traverse BST so that the path forms sorted sequence.
// - So basically we can consider this task as identifying 2 swapped elements of sorted list.
//
// Steps:
// - Traverse the tree so that on each step next value should be greater than previous.
// - Identify nodes that were swapped, they will be defects in the sequence.
// - Swapping node values in place.
export function recoverTree(root: TreeNode | null): void {
  const iterator = traverse(root);

  let { value, done } = iterator.next();

  let stop = false;
  let prev: TreeNode | undefined = undefined;

  let defects: TreeNode[] = [];

  while (value && !done && !stop) {
    console.log('yielded value: ', value);
    if (prev && prev.val > value?.val) {
      console.log('prev, current: ', prev, value);
      // We have a defect in the sequence.
      console.log('defect detected: ', prev.val, value.val);

      if (defects.length) {
        defects = [defects[0], value];
      } else {
        defects = [prev, value];
      }
    }

    prev = value;
    ({ value, done } = iterator.next());
  }

  if (defects.length) {
    const sortedDefects = [...defects].sort((a, b) => a.val - b.val);
    console.log('defects: ', defects);
    console.log('sorted defects: ', sortedDefects);

    for (let i = 0; i < defects.length; i++) {
      const x = defects[i];
      const y = sortedDefects[i];

      if (x.val !== y.val) {
        swapInPlace(x, y);
        return;
      }
    }

    console.log('after recover: ', defects);
  }
}

// Good example for using generators. Each call of this function should return next element in the sequence.
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

function swapInPlace(x: TreeNode, y: TreeNode) {
  console.log('swapping: ', x, y);

  const temp = x.val;
  x.val = y.val;
  y.val = temp;
}
