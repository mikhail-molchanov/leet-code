/**
 * Problem description:
 * https://leetcode.com/problems/unique-paths/
 */

// Algorithm: Recursion + cache.
// Intuition:
//  - n for [X, Y] === n for [Y, X]. So we should check the cache twice for every pair of [X, Y].
//  - number of unique paths at any point is number of paths that start from RIGHT move + number of paths
//    that start from DOWN move.
//  - since we're only allowed to go either RIGHT or DOWN there is no need to care about "uniqueness" of each
//    path, it's guaranteed by the way we move.
export function uniquePaths(m: number, n: number): number {
  // Init the cache with the same dimensions as the grid itself.
  const cache: number[][] = new Array(m).fill(null).map(v => new Array(n));

  // We know the solution for the case when we're in the final destination: it's exactly 1.
  cache[0][0] = 1;

  const addToCache = (x: number, y: number, value: number) => (cache[x - 1][y - 1] = value);

  // We can also check the cache for reversed dimensions of sub-grid (if dimensions are inside the cache's boundaries).
  const getFromCache = (x: number, y: number) => {
    return cache[x - 1][y - 1] || (x <= n && y <= m && cache[y - 1][x - 1]);
  };

  // Helper recursive function that uses cache.
  const iterate = (m: number, n: number): number => {
    // If we already know the answer for specified dimensions - return it from cache.
    const cached = getFromCache(m, n);

    if (cached) {
      return cached;
    }

    let result = 0;

    // We can either go DOWN (if possible) ...
    if (m > 1) {
      result += iterate(m - 1, n);
    }

    // ... or RIGHT.
    if (n > 1) {
      result += iterate(m, n - 1);
    }

    // Cache the result for current dimensions.
    addToCache(m, n, result);

    return result;
  };

  return iterate(m, n);
}
