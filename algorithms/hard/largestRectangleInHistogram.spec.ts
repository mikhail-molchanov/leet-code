import { largestRectangleArea } from './largestRectangleInHistogram';

describe('84. Largest Rectangle in Histogram', () => {
  test.each([
    [[2, 1, 5, 6, 2, 3], 10],
    [[2, 4], 4],
    [[1000], 1000],
    [[10, 10], 20],
    [[10, 1, 1, 10], 10],
    [[10, 1, 1, 1, 1, 2, 1, 1, 1, 2, 10], 11],
  ])('largest rectangle for histogram %p should be %p', (array, result) => {
    expect(largestRectangleArea(array)).toEqual(result);
  });
});
