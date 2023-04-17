import { generateParenthesis } from './generateParentheses';

describe('Generate Parentheses', () => {
  test.each([
    [1, ['()']],
    [2, ['(())', '()()']],
    [3, ['((()))', '(()())', '(())()', '()(())', '()()()']],
    [
      4,
      [
        '(((())))',
        '((()()))',
        '((())())',
        '((()))()',
        '(()(()))',
        '(()()())',
        '(()())()',
        '(())(())',
        '(())()()',
        '()((()))',
        '()(()())',
        '()(())()',
        '()()(())',
        '()()()()',
      ],
    ],
  ])('valid parentheses for n = %p: %p', (n, output) => {
    expect(generateParenthesis(n)).toEqual(output);
  });
});
