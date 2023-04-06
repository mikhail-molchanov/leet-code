/**
 * Problem description:
 * https://leetcode.com/problems/roman-to-integer/
 */

type RomanSymbol = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';

type Replacement = {
  /**
   * A number to add to the result when symbol is found.
   */
  value: number;
  /**
   * What symbols if present right before the current one will inverse its "value" to the negative.
   * E.g. if "I" appeared before 'V' then it should be subtracted from the result.
   */
  inverse?: readonly string[];
};

const replacements: Record<RomanSymbol, Replacement> = {
  I: { value: 1, inverse: ['V', 'X'] },
  V: { value: 5 },
  X: { value: 10, inverse: ['L', 'C'] },
  L: { value: 50 },
  C: { value: 100, inverse: ['D', 'M'] },
  D: { value: 500 },
  M: { value: 1000 },
};

export const romanToInt = (s: string): number => {
  // Conversion result is gonna be accumulated here.
  let result = 0;

  // Previously read character. This var is not really needed, we can always read prev
  // value from the string itself. Just for illustration purposes.
  let prevChar = '';

  // Going in reverse order (end to start).
  for (let i = s.length - 1; i >= 0; i--) {
    // Get current char. The assumption is that it's always gonna be a valid Roman symbol.
    const char = s[i] as RomanSymbol;

    // Get the replacement rule.
    const { value, inverse } = replacements[char];

    // Either add or subtract the value based on previous char.
    if (prevChar && inverse?.includes(prevChar)) {
      result -= value;
    } else {
      result += value;
    }

    prevChar = char;
  }

  return result;
};
