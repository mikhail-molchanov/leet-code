/**
 * Problem description:
 * https://leetcode.com/problems/restore-ip-addresses/
 */

// Algorithm:
// - Nothing special, start from the beginning of the string.
// - Take one char and check if it is a valid IP digit, if it's not => return.
// - If it's a valid IP digit then remember it and repeat algorithm recursively with num digits to find reduced by one.
//
// Probably could be optimized if operations are done on array of numbers instead of string (to avoid parseInt()).
export function restoreIpAddresses(s: string, numDigits = 4): string[] {
  // Use some shortcuts: number of chars left should be at least be equal number of digits to restore.
  if (s.length < numDigits) {
    return [];
  }

  // For the final digit we either take the rest of the string as a whole (if it's valid IP digit) or return nothing.
  if (numDigits === 1) {
    return isValidDigit(s) ? [s] : [];
  }

  let result: string[] = [];

  // Take first char.
  let digit = s[0];

  // Keep taking more chars from the beginning of the string and check if they still form valid IP digit.
  while (isValidDigit(digit)) {
    // Repeat itself with reduced number of digits and truncated input string.
    s = s.slice(1);
    let otherDigits = restoreIpAddresses(s, numDigits - 1);

    // If for current digit we could find the remainders => add list of variations to the result.
    otherDigits.forEach(part => {
      result.push(digit + '.' + part);
    });

    // Take next char and add it to the current digit (if available).
    if (s.length) {
      digit += s[0];
    } else {
      // Mark the end of the algorithm.
      digit = '';
    }
  }

  return result;
}

// Helper function to determine of given string is a valid IP digit.
export const isValidDigit = (digit: string) => {
  if (!digit.length) {
    return false;
  } else if (digit.length === 1) {
    return true;
  } else if (digit.length <= 3) {
    if (digit[0] === '0') {
      return false;
    }

    return parseInt(digit) <= 255;
  }

  return false;
};
