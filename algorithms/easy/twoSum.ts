/**
 * Problem description:
 * https://leetcode.com/problems/two-sum/
 */

// One pass with map.
export function twoSum(nums: number[], target: number): number[] {
  const candidates = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    const candidateIndex = candidates.get(num);

    if (candidateIndex !== undefined && candidateIndex >= 0) {
      return [candidateIndex, i];
    }

    // Store complimentary value in the map.
    candidates.set(target - num, i);
  }

  return [];
}
