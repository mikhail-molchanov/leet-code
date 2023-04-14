/**
 * Problem description:
 * https://leetcode.com/problems/palindrome-number/
 */

/**
 * Algorithm (mine):
 * - Convert number to digits array.
 * - Compare digits at the same positions relative to start and end of the array.
 *
 * The most effective algorithm is smarter than that.
 * The idea is to reverse last half of the number and compare it with the first half.
 * The only trick is to understand when to stop (see LeetCode for the full explanation).
 */
export function isPalindrome(x: number): boolean {
  // Shortcut: negative numbers are not palindromes by definition.
  if (x < 0) {
    return false;
  }

  const digits: number[] = [];

  // Collect the digits.
  while (x >= 1) {
    const remainder = x % 10;
    digits.push(remainder);
    x = Math.floor(x / 10);
  }

  // Compare digits until start and end indexes meet each other.
  for (let i = 0, j = digits.length - 1; i <= j; i++, j--) {
    if (digits[i] !== digits[j]) {
      return false;
    }
  }

  return true;
}
