import { equalDeep } from '../../shared/utils';

import { combinationSum2_2 } from './combinationSum2';

describe('Combination Sum II', () => {
  test.each([
    [[1, 1, 1], 1, [[1]]],
    [[1, 1], 2, [[1, 1]]],
    [[1, 1, 1], 2, [[1, 1]]],
    [[1, 1, 1], 3, [[1, 1, 1]]],
    [
      [10, 1, 2, 7, 6, 1, 5],
      8,
      [
        [1, 1, 6],
        [1, 2, 5],
        [1, 7],
        [2, 6],
      ],
    ],
    [[2, 5, 2, 1, 2], 5, [[1, 2, 2], [5]]],
    [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1,
      ],
      30,
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    ],
  ])('combinations of %p that add up to %p: %p', (candidates, target, expected) => {
    const result = combinationSum2_2(candidates, target);
    expect(equalDeep(expected, result)).toBeTruthy();
  });
});
