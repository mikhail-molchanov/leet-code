import { hasPathSum } from './pathSum';
import { treeFromArray } from './utils';

describe('Path Sum', () => {
  test.each([
    [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22, true],
    [[1, 2, 3], 5, false],
    [[], 0, false],
    [[1, 2], 1, false],
    [[-2, null, -3], -5, true],
  ])('tree %p has path that adds up to %p: %p', (treeArray, target, result) => {
    const tree = treeFromArray(treeArray);
    expect(hasPathSum(tree, target)).toEqual(result);
  });
});
