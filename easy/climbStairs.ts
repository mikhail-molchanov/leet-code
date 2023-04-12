/**
 * Problem description;
 * https://leetcode.com/problems/climbing-stairs/
 */

// Option1: recursion + hash map.
// Optimizations:
// - Iterative instead of recursive.
// - Only store previous
export function climbStairs(n: number): number {
  // Feel in known results for 1 and 2 steps.
  const hash = new Map<number, number>([
    [1, 1],
    [2, 2],
  ]);

  const count = (n: number): number => {
    // Stop when we reached the end of the stairs.
    if (n <= 0) {
      return 0;
      // If on any step we already know the answer => return it from the hash map.
    } else if (hash.has(n)) {
      return hash.get(n)!;
    } else {
      // At any point we can only do either 1 step or 2 steps.
      // Both routes count as 1 variant.
      // The rest of the path is (n - 1) and (n - 2) respectively so we can use recursion.
      const result = count(n - 1) + count(n - 2);

      // Store the result in the hash map.
      hash.set(n, result);
      return result;
    }
  };

  return count(n);
}
