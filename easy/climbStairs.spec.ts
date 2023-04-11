import { climbStairs } from './climbStairs';

describe('Climb Stairs', () => {
  test.each([
    [2, 2],
    [3, 3],
    [4, 5],
    [40, 165580141],
  ])('number of distinct ways to climb %p stairs: %p', (numStairs, numWays) => {
    expect(climbStairs(numStairs)).toEqual(numWays);
  });
});
