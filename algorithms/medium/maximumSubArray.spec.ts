import { maxSubArray } from './maximumSubArray';

describe('Maximum Sub-Array', () => {
  test.each([
    [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6],
    [[1], 1],
    [[5, 4, -1, 7, 8], 23],
  ])('maximum sum of subarray for %p: %p', (array, result) => {
    expect(maxSubArray(array)).toEqual(result);
  });
});
