import { treeFromArray } from '../../shared/utils';
import { isBalanced } from './balancedBinaryTree';

describe('Balanced Binary Tree', () => {
  test.each([
    [[], true],
    [[3, 9, 20, null, null, 15, 7], true],
    [[1, 2, 2, 3, 3, null, null, 4, 4], false],
  ])('tree is symmetric %p: %p', (treeArray, result) => {
    expect(isBalanced(treeFromArray(treeArray))).toEqual(result);
  });
});
