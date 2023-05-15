import { uniquePaths } from './uniquePaths';

describe('Unique Paths', () => {
  test.each([
    [1, 1, 1],
    [2, 1, 1],
    [2, 2, 2],
    [3, 2, 3],
    [3, 7, 28],
    [10, 10, 48620],
    [20, 30, 11541847896480],
  ])('number of unique paths for [%p, %p] grid: %p', (m, n, result) => {
    expect(uniquePaths(m, n)).toEqual(result);
  });
});
