import { isPalindrome } from './palindromeNumber';

describe('isPalindrome', () => {
  test.each([
    [1, true],
    [121, true],
    [-121, false],
    [10, false],
    [12321, true],
    [123321, true],
    [123421, false],
  ])('number %p is palindrome: %p', (input, result) => {
    expect(isPalindrome(input)).toEqual(result);
  });
});
