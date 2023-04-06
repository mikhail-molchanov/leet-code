/**
 * Problem description;
 * https://leetcode.com/problems/longest-common-prefix/
 */

/**
 * Variant 1: do it the most straightforward way, literally compare letters one by one for every string.
 */
export const longestCommonPrefix1 = (strs: string[]): string => {
  // Final result.
  let result = '';

  // Position to check in the incoming strings.
  let pos = 0;

  while (true) {
    // Check if at current position all strings have the same character (candidate).
    let candidate = '';

    // Go through every string and check symbol at "pos".
    for (let i = 0; i < strs.length; i++) {
      const s = strs[i];

      // We reached the end of some string, there is no point to continue.
      if (pos >= s.length) {
        return result;
      }

      // Get current character.
      let c = s[pos];

      // Use character from the first string and compare with others.
      if (i === 0) {
        candidate = c;
      } else if (c !== candidate) {
        return result;
      }
    }

    // Common character found at current position => add to the result prefix and move to the next position.
    pos++;
    result += candidate;
  }
};

/**
 * Variant 2
 *
 * Algorithm:
 * - Take first string as a first approximation of common prefix.
 *   The only tricky thing to realize is that final prefix will
 *   ALWAYS be a substring of the first approximation.
 *   So we only need to figure out the length of the final prefix and
 *   then apply it over first approximation.
 * - For every other string narrow the "window" down by comparing it with
 *   current prefix letter by letter unless end of any of them is met.
 * - On every step the length of the prefix is gonna either stay the same
 *   or decrease thus requiring less and less further comparisons.
 */
export const longestCommonPrefix2 = (strs: string[]): string => {
  // First approximation. We can use "const" here since buffer itself is not gonna change,
  // only the prefix window size.
  const buffer = strs[0];

  // Assume that whole string can potentially be a common prefix.
  let length = buffer.length;

  // Cycle through the rest of the strings.
  for (let i = 1; i < strs.length; i++) {
    // Get the string.
    const s = strs[i];

    // Common prefix can't be longer than shortest of two strings.
    // At best they can be equal.
    length = Math.min(length, s.length);

    // Compare strings letter by letter until they match.
    let j = 0;
    while (j < length && s[j] === buffer[j]) {
      j++;
    }

    // Adjust the window size (potential prefix length) based on comparison results.
    length = j;

    // No matches => no common prefix.
    if (!length) {
      break;
    }
  }

  // Finally apply common prefix window over initial buffer.
  return buffer.substring(0, length);
};

/**
 * Variant 3: clever one (not mine).
 *
 * Algorithm:
 * - Sort array first and then you'll only to find common prefix between the first and the last strings. Profit =)
 *
 * I was thinking about sorting array first to somehow speed things up but the idea of
 * comparing only first and last ones didn't really hit me.
 */
