import { treeFromArray } from '../../shared/utils';
import {
  inorderTraversal,
  inorderTraversal2,
  inorderTraversal3,
} from './binaryTreeInOrderTraversal';

describe('Binary Tree In-Order Traversal', () => {
  test.each([
    [
      [1, null, 2, 3],
      [1, 3, 2],
    ],
    // Make sure zeros are properly handled.
    [
      [1, null, 0, 3],
      [1, 3, 0],
    ],
    [[], []],
    [[1], [1]],
  ])('in-order traversal of tree %p: %p', (input, output) => {
    const tree = treeFromArray(input);
    expect(inorderTraversal(tree)).toEqual(output);
    expect(inorderTraversal2(tree)).toEqual(output);
    expect(inorderTraversal3(tree)).toEqual(output);
  });
});
