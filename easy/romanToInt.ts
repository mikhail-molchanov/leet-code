/**
 * Task description:
 * https://leetcode.com/problems/roman-to-integer/
 */
const symbols: Record<string, { value: number; inverse?: string[] }> = {
  I: { value: 1, inverse: ['V', 'X'] },
  V: { value: 5 },
  X: { value: 10, inverse: ['L', 'C'] },
  L: { value: 50 },
  C: { value: 100, inverse: ['D', 'M'] },
  D: { value: 500 },
  M: { value: 1000 },
};

export const romanToInt = (s: string): number => {
  let result = 0;
  let prev = '';
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i];
    const { value, inverse } = symbols[c];

    if (prev && inverse && inverse.includes(prev)) {
      result -= value;
    } else {
      result += value;
    }

    prev = c;
  }

  return result;
};
