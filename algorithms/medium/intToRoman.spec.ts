import { intToRoman } from './intToRoman';

describe('Integer To Roman', () => {
  test.each([
    [1, 'I'],
    [4, 'IV'],
    [3, 'III'],
    [58, 'LVIII'],
    [1994, 'MCMXCIV'],
  ])('roman representation for %p: %p', (int, roman) => {
    expect(intToRoman(int)).toEqual(roman);
  });
});
