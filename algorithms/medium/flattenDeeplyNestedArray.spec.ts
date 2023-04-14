import { flat } from './flattenDeeplyNestedArray';

describe('Flatten Deeply Nested Array', () => {
  test.each([
    [
      [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
      0,
      [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
    ],
    [
      [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]],
      1,
      [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15],
    ],
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, [9, 10, 11], 12],
        [13, 14, 15],
      ],
      2,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    ],
  ])('flattened version of array %p for depth %p: %p', (input, depth, output) => {
    expect(flat(input, depth)).toEqual(output);
  });
});
