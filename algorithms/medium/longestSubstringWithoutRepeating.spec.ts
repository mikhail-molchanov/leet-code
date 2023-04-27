import { lengthOfLongestSubstring } from './longestSubstringWithoutRepeating';

describe('Longest Substring Without Repeating Characters', () => {
  test.each([
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3],
    ['qrsvbspk', 5],
  ])('longest substring of %p: %p', (s, result) => {
    expect(lengthOfLongestSubstring(s)).toEqual(result);
  });
});
