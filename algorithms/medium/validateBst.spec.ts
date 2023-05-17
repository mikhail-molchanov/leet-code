import { treeFromArray } from '../../shared/utils';

import { isValidBST } from './validateBst';

describe('Validate Binary Search Tree', () => {
  test.each([
    [[1], true],
    [[2, 1, 3], true],
    [[1, 3, 2], false],
    [[5, 1, 4, null, null, 3, 6], false],
    [[5, 4, 6, null, null, 3, 7], false],
    [[-1, -1], false],
  ])('is valid BST %p: %p', (treeArray, result) => {
    const tree = treeFromArray(treeArray);
    expect(isValidBST(tree)).toEqual(result);
  });
});
