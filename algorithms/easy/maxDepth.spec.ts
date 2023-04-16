import { TreeNode } from '../../shared/utils';

import { maxDepth, maxDepth2 } from './maxDepth';

describe('Max Tree Depth', () => {
  test.each([
    [null, 0],
    [new TreeNode(1), 1],
    [new TreeNode(1, new TreeNode(2)), 2],
    [new TreeNode(1, new TreeNode(21), new TreeNode(22, new TreeNode(31))), 3],
  ])('max depth of tree %p: %p', (tree, depth) => {
    expect(maxDepth(tree)).toEqual(depth);
    expect(maxDepth2(tree)).toEqual(depth);
  });
});
