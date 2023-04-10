import { plusOne } from './plusOne';

/**
 * Problem description;
 * https://leetcode.com/problems/plus-one/
 */
describe('Plus One', () => {
  test.each([
    [[0], [1]],
    [[9], [1, 0]],
    [
      [1, 2, 3],
      [1, 2, 4],
    ],
    [
      [4, 3, 2, 1],
      [4, 3, 2, 2],
    ],
    [
      [9, 9, 9],
      [1, 0, 0, 0],
    ],
  ])('result of plus one for array %p: %p', (input, result) => {
    expect(plusOne(input)).toEqual(result);
  });
});
