import { spiralOrder } from './spiralMatrix';

describe('Spiral Matrix', () => {
  test.each([
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      [1, 2, 3, 6, 9, 8, 7, 4, 5],
    ],
    [
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
      [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
    ],
  ])('spiral order of matrix %p: %p', (matrix, output) => {
    expect(spiralOrder(matrix)).toEqual(output);
  });
});
