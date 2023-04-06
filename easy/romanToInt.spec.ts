import { romanToInt } from './romanToInt';

describe('romanToInt', () => {
  test.each([
    ['', 0],
    ['I', 1],
    ['XIX', 19],
    ['XXVII', 27],
    ['LVIII', 58],
    ['MCMXCIV', 1994],
  ])('converts %p to %p', (roman, int) => {
    expect(romanToInt(roman)).toEqual(int);
  });
});
