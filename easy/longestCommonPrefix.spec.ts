import { longestCommonPrefix1, longestCommonPrefix2 } from './longestCommonPrefix';

describe('Longest Common Prefix', () => {
  test.each([
    [['flower', 'flow', 'flight'], 'fl'],
    [['flower', 'fl', 'flight'], 'fl'],
    [['dog', 'racecar', 'car'], ''],
    [['', 'b'], ''],
  ])('longest prefix for %p is %p', (array, prefix) => {
    expect(longestCommonPrefix1(array)).toEqual(prefix);
    expect(longestCommonPrefix2(array)).toEqual(prefix);
  });
});
