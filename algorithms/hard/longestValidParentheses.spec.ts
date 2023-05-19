import { longestValidParentheses } from './longestValidParentheses';

describe('Longest Valid Parentheses', () => {
  test.each([
    ['', 0],
    ['(', 0],
    [')', 0],
    ['()', 2],
    ['(()', 2],
    ['()(()', 2],
    ['()((()))', 8],
    ['())((()))', 6],
    [')()())', 4],
    [')))(()())((', 6],
  ])('longest valid parentheses length for %p: %p', (s, length) => {
    expect(longestValidParentheses(s)).toEqual(length);
  });
});
