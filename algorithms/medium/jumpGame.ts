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

// Solution from LeetCode is more elegant since it doesn't require to iterate through all array indexes as the one above.
// It's about maintaining "the reachable edge ahead" on each step i.e. max steps we can do from current position.
export function canJump2(nums: number[]): boolean {
  let indexToReach = nums.length - 1;

  // Start at the beginning of the array.
  let index = 0;
  let stepsLeft = nums[index];

  while (stepsLeft) {
    if (index + stepsLeft >= indexToReach) {
      return true;
    }

    // Do the step.
    index++;

    // This is the central point of the algorithm:
    // calculate new furthest point we can reach from here.
    stepsLeft = Math.max(nums[index], stepsLeft - 1);
  }

  return false;
}
