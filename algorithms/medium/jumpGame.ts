/**
 * Problem description:
 * https://leetcode.com/problems/jump-game/
 */

// Took me a while to realize how simple the solution is if you go backwards.
export function canJump(nums: number[]): boolean {
  let indexToReach = nums.length - 1;
  let index = indexToReach - 1;

  while (index >= 0) {
    if (index + nums[index] >= indexToReach) {
      indexToReach = index;
    }

    index--;
  }

  return indexToReach === 0;
}
