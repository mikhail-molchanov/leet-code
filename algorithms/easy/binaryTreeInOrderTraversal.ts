/**
 * Problem description:
 * https://leetcode.com/problems/binary-tree-inorder-traversal/
 */

import { TreeNode } from '../../shared/utils';

export function inorderTraversal(root: TreeNode | null): number[] {
  const traverse = (node?: TreeNode | null): number[] => {
    if (!node) {
      return [];
    }

    return [...traverse(node.left), node.val, ...traverse(node.right)];
  };

  return traverse(root);
}

export function inorderTraversal2(root: TreeNode | null): number[] {
  const traverse = (node: TreeNode | null, result: number[]) => {
    if (!node) {
      return;
    }

    traverse(node.left, result);
    result.push(node.val);
    traverse(node.right, result);
  };

  const result: number[] = [];
  traverse(root, result);
  return result;
}

// Iterative approach with stack.
export function inorderTraversal3(root: TreeNode | null): number[] {
  // Have a stack of items to process on each step.
  // The item could be either a number or a node.
  let stack: (TreeNode | number)[] = root ? [root] : [];

  // Accumulated list.
  const result: number[] = [];

  // Put item at the top of the stack if it's not empty (null).
  const add = (item: TreeNode | number | null) => {
    if (item !== null) {
      stack.unshift(item);
    }
  };

  // Called in a loop until there are no more items in the stack left to process.
  const step = (): boolean => {
    // Stack is empty => finish of the algorithm.
    if (!stack.length) {
      return false;
    }

    // Pick top element from the stack (and remove it).
    const item = stack.shift();

    // Shouldn't really be the case. We guarantee that stack consists for non-empty elements.
    if (item === undefined) {
      return true;
    }

    // If it's a number then add it to resulting array,
    // there is no more work that can be done for this element.
    if (typeof item === 'number') {
      result.push(item);
    } else {
      // If it's a node then add left, val and right objects to the stack:
      // [left, val, right, ...rest]
      // Thus next step will pick up the "left" one.
      const { left, val, right } = item;
      add(right);
      add(val);
      add(left);
    }

    // Return "true" to indicate there are some elements in the stack to process.
    return true;
  };

  // Repeat "step" until stack is empty.
  // Effectively we're flattening the tree.
  while (step());

  return result;
}
