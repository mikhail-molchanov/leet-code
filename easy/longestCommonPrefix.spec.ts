import { longestCommonPrefix1 } from './longestCommonPrefix';

describe('longestCommonPrefix1', () => {
  test.each([
    [['flower', 'flow', 'flight'], 'fl'],
    [['flower', 'fl', 'flight'], 'fl'],
    [['dog', 'racecar', 'car'], ''],
  ])('longest prefix for %p is %p', (roman, int) => {
    expect(longestCommonPrefix1(roman)).toEqual(int);
  });
});
