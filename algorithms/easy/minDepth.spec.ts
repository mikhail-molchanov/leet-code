import { treeFromArray } from '../../shared/utils';

import { minDepth, minDepth2 } from './minDepth';

describe('Min Tree Depth', () => {
  test.each([
    [[null], 0],
    [[1], 1],
    [[1, 2], 2],
    [[1, 2, null, 3], 3],
    [[3, 9, 20, null, null, 15, 7], 2],
    [[2, null, 3, null, 4, null, 5, null, 6], 5],
  ])('min depth of tree %p: %p', (treeArray, depth) => {
    const tree = treeFromArray(treeArray);
    expect(minDepth(tree)).toEqual(depth);
    expect(minDepth2(tree)).toEqual(depth);
  });

  // A tiny benchmark (spoiler: minDepth2 does much better).
  const testTrees = [
    [1, 2, 3, 4, 5, 6, 7],
    [2, null, 3, null, 4, null, 5, null, 6],
    [3, 9, 20, null, null, 15, 7],
    [1, 2, null, 3],
  ].map(treeFromArray);

  [minDepth, minDepth2].forEach(fn => {
    console.time(fn.name);
    for (let i = 0; i < 100000; i++) {
      testTrees.forEach(fn);
    }
    console.timeEnd(fn.name);
  });
});
