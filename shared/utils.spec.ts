import { TreeNode, equalDeep, treeFromArray, treeToArray } from './utils';

describe('treeToArray', () => {
  test.each([
    [new TreeNode(1), [1]],
    [new TreeNode(1, new TreeNode(21), new TreeNode(22)), [1, 21, 22]],
    [
      new TreeNode(
        1,
        new TreeNode(21, new TreeNode(31)),
        new TreeNode(22, new TreeNode(33), new TreeNode(34))
      ),
      [1, 21, 22, 31, 33, 34],
    ],
  ])('array representation of tree %p is %p', (tree, array) => {
    expect(treeToArray(tree)).toEqual(array);
  });
});

describe('treeFromArray', () => {
  test.each([
    [[1], new TreeNode(1)],
    [[1, 21, 22], new TreeNode(1, new TreeNode(21), new TreeNode(22))],
    [
      [1, 21, 22, 31, 32, null, 34],
      new TreeNode(
        1,
        new TreeNode(21, new TreeNode(31), new TreeNode(32)),
        new TreeNode(22, null, new TreeNode(34))
      ),
    ],
  ])('works correctly for array %p', (array, tree) => {
    expect(treeFromArray(array)).toEqual(tree);
  });
});

describe('equalDeep', () => {
  test.each([
    [1, 1, true],
    [0, 1, false],
    [[], [], true],
    [[1], 1, false],
    [1, [1], false],
    [[1], [1], true],
    [[1, 2, 3], [3, 2, 1], true],
    [[1, 2, 3, [2]], [3, [2], 2, 1], true],
    [[1], [1, 2], false],
    [[1, 2, 3], [1, 2], false],
    [
      [
        [1, 2, 3],
        [4, 5],
      ],
      [
        [5, 4],
        [3, 1, 2],
      ],
      true,
    ],
  ])('number of arrays deep equality: %p === %p = %p', (obj1, obj2, result) => {
    expect(equalDeep(obj1, obj2)).toEqual(result);
  });
});
