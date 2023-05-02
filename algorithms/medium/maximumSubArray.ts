/**
 * Problem description:
 * https://leetcode.com/problems/maximum-subarray/
 */

// Quite an easy one to implement once you get an idea.
// On each step we're gonna calculate:
// - Best sum that ENDs at current position. It is either current number or current number plus POSITIVE tail.
//   NEGATIVE tail will never win.
// - Best overall sum
// That's it =)
export function maxSubArray(nums: number[]): number {
  let bestSum = Number.MIN_SAFE_INTEGER;
  let bestTail = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // Check whether adding trailing value is gonna improve the sum.
    const sum = Math.max(num, num + bestTail);
    // Check whether current sum is better than the best one.
    bestSum = Math.max(sum, bestSum);
    // Remember best trailing sum.
    bestTail = sum;
  }

  return bestSum;
}
