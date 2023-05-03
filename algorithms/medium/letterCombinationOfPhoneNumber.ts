/**
 * Problem description:
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 */

// Not sure why this one is classified with "medium" complexity.

// Use string keys since numbers are passed as string.
const mapping: Record<string, string> = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
};

export function letterCombinations(digits: string): string[] {
  const result: string[] = [];

  const iterate = (digits: string, combination = '') => {
    // No more digits left to process => push current combination if it is not empty (corner case).
    if (!digits.length) {
      if (combination) {
        result.push(combination);
      }
      return;
    }

    // Skip checking that mapping[digit] actually exists. It is guaranteed by task definition.
    const digit = digits[0];
    const letters = mapping[digit];

    for (let letter of letters) {
      // For each "letter" iterate again reducing "digits" from the left and adding letter to the end of "combination".
      iterate(digits.slice(1), combination + letter);
    }
  };

  iterate(digits);

  return result;
}
