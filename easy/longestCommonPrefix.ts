/**
 * Problem description;
 * https://leetcode.com/problems/longest-common-prefix/
 */

/**
 * Variant 1: do it the most straightforward way.
 */
export const longestCommonPrefix1 = (strs: string[]): string => {
  // Final result.
  let result = '';

  // End of iterations;
  let end = false;

  // Position to check in the incoming strings.
  let pos = 0;

  while (!end) {
    // Check if at current position all strings have the same character (candidate).
    let candidate = '';

    // Go through every string and check symbol at "pos".
    for (let i = 0; i < strs.length; i++) {
      const s = strs[i];

      // We reached the end of some string, there is no point to continue.
      if (pos >= s.length) {
        // Indicates the end of algorithm.
        candidate = '';
        break;
      }

      // Get current character.
      let c = s[pos];

      // Use character from the first string and compare with others.
      if (i === 0) {
        candidate = c;
      } else if (c !== candidate) {
        // Some of the string doesn't match the candidate at current position => end of algorithm.
        candidate = '';
        break;
      }
    }

    // Common character found at current position => add to the result prefix and move to the next position.
    if (candidate) {
      pos++;
      result += candidate;
    } else {
      // End of algorithm.
      end = true;
    }
  }

  return result;
};
