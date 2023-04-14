import { TreeNode, treeFromArray, treeToArray } from './utils';

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
