import { longestCommonPrefix1, longestCommonPrefix2 } from './longestCommonPrefix';

describe('longestCommonPrefix', () => {
  test.each([
    [['flower', 'flow', 'flight'], 'fl'],
    [['flower', 'fl', 'flight'], 'fl'],
    [['dog', 'racecar', 'car'], ''],
    [['', 'b'], ''],
  ])('longest prefix for %p is %p', (roman, int) => {
    expect(longestCommonPrefix1(roman)).toEqual(int);
    expect(longestCommonPrefix2(roman)).toEqual(int);
  });
});
