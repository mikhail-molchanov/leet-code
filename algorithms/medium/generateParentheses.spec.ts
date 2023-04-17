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

  // Just a small test to see how it grows :)
  // for (let i = 1; i < 10; i++) {
  //   console.log(i, generateParenthesis(i).length);
  // }
});
