/**
 * Problem description;
 * https://leetcode.com/problems/length-of-last-word/
 */
export function lengthOfLastWord(s: string): number {
  let length = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ' ') {
      if (length) {
        break;
      }
    } else {
      length++;
    }
  }

  return length;
}
