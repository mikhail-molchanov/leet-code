/**
 * Problem description:
 * https://leetcode.com/problems/valid-parentheses/
 */

/**
 * Algorithm:
 * - One pass
 * - Scan every character
 * - If it's an opening (left) bracket => place it on top of the stack.
 * - If it's a closing (right) bracket => check top of the stack - it should have matching opening bracket.
 *   Remove matching bracket from the stack. If it doesn't match => parentheses are not valid.
 * - Skip all other characters.
 * - If in the end the stack is empty => the parentheses are valid.
 */

// Having inverted brackets map is a bit more useful.
const brackets = new Map([
  [')', '('],
  [']', '['],
  ['}', '{'],
]);

const left = new Set(brackets.values());

const isLeftBracket = (s: string) => left.has(s);
const isRightBracket = (s: string) => brackets.has(s);
const getLeftBracket = (s: string) => brackets.get(s)!;

export function isValid(s: string): boolean {
  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (isLeftBracket(c)) {
      stack.push(c);
    } else if (isRightBracket(c) && stack.pop() !== getLeftBracket(c)) {
      return false;
    }
  }

  return !stack.length;
}
