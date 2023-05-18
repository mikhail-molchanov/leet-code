import { treeFromArray, treeToArray } from '../../shared/utils';

import { recoverTree } from './recoverBst';

describe('Recover Binary Search Tree', () => {
  test.each([
    [
      [4, 2, 6, 1, 3, 5, 7],
      [4, 2, 6, 1, 3, 5, 7],
    ], // Well formed BST should not be changed.
    [[1], [1]],
    [
      [1, 2],
      [2, 1],
    ],
    [
      [2, 3, 1],
      [2, 1, 3],
    ],
    [
      [1, 3, null, null, 2],
      [3, 1, null, null, 2],
    ],
    [
      [3, 1, 4, null, null, 2],
      [2, 1, 4, null, null, 3],
    ],
  ])('recovered version of BST %p: %p', (input, output) => {
    const tree = treeFromArray(input);
    recoverTree(tree);
    const recovered = treeToArray(tree);
    expect(recovered).toEqual(output);
  });
});
