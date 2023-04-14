import { TreeNode } from './utils';

import { isSameTree } from './sameTree';

describe('Same Tree', () => {
  test.each([
    [null, null, true],
    [null, new TreeNode(), false],
    [
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      new TreeNode(1, new TreeNode(2), new TreeNode(3)),
      true,
    ],
    [new TreeNode(1, new TreeNode(2), null), new TreeNode(1, null, new TreeNode(2)), false],
    [
      new TreeNode(1, new TreeNode(2), new TreeNode(1)),
      new TreeNode(1, new TreeNode(1), new TreeNode(2)),
      false,
    ],
  ])('compares trees correctly: %p, %p => %p', (tree1, tree2, result) => {
    expect(isSameTree(tree1, tree2)).toEqual(result);
  });
});
