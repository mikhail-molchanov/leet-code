import { equalDeep } from '../../shared/utils';
import { letterCombinations } from './letterCombinationOfPhoneNumber';

describe('Letter Combinations of a Phone Number', () => {
  test.each([
    ['23', ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']],
    ['', []],
    ['2', ['a', 'b', 'c']],
  ])('letter combinations of %p: %p', (digits, combinations) => {
    const result = equalDeep(letterCombinations(digits), combinations);
    expect(result).toBeTruthy();
  });
});
