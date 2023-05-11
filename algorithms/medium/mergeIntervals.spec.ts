import { merge } from './mergeIntervals';

describe('Merge Intervals', () => {
  test.each([
    [[[1, 2]], [[1, 2]]],
    [
      [
        [1, 2],
        [1, 2],
      ],
      [[1, 2]],
    ],
    [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
      [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
    ],
    [
      [
        [1, 4],
        [4, 5],
      ],
      [[1, 5]],
    ],
    [
      [
        [1, 4],
        [5, 6],
      ],
      [
        [1, 4],
        [5, 6],
      ],
    ],
    [
      [
        [1, 4],
        [0, 4],
      ],
      [[0, 4]],
    ],
  ])('merged intervals of %p: %p', (intervals, output) => {
    expect(merge(intervals)).toEqual(output);
  });
});
