/**
 * Problem description:
 * https://leetcode.com/problems/integer-to-roman/
 */

const digits = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
] as const;

export function intToRoman(num: number): string {
  let result = '';

  for (let [int, roman] of digits) {
    while (num >= int) {
      result += roman;
      num = num - int;
    }
  }

  return result;
}
