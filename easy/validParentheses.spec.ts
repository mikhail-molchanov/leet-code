import { isValid } from './validParentheses';

describe('Valid Parentheses', () => {
  test.each([
    ['', true],
    ['()', true],
    ['()[]{}', true],
    ['(] ', false],
    ['(( )', false],
    ['({ }) [()]', true],
  ])('number %p is palindrome: %p', (input, result) => {
    expect(isValid(input)).toEqual(result);
  });
});
