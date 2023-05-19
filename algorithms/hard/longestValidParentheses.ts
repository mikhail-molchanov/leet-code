/**
 * Problem description:
 * https://leetcode.com/problems/longest-valid-parentheses/
 */

// Intuition:
// - Whenever valid closing bracket is detected we can increase valid length by 2.
// - Whenever invalid closing bracket is detected we should reset length to 0.
// - Now, the only problem is with string like this: "()(()"
//   We can't say if "()"" and "(()" form a single valid string until we read the whole string.
//   So we can't add length of previous valid string for every valid closing bracket.
//   What do we do? Whenever opening bracket is detected we can store a length
//   of last valid adjacent string (if any). Thus when we detect closing bracket and "read"
//   opening bracket from the stack we can identify whether current valid string and previous
//   adjacent one can be concatenated together.
export function longestValidParentheses(s: string): number {
  // Resulting max length of longest valid substring.
  let result = 0;

  // Instead of opening brackets counter we have a stack of "brackets".
  // The number component is a length of adjacent valid string (if any).
  const stack: number[] = [];

  // Length of current valid substring (if any).
  let length = 0;

  // Iterate over each character.
  for (let i = 0; i < s.length; i++) {
    // Get current bracket.
    const char = s[i];

    // Opening ones go directly to the stack together as "length" of recent adjacent valid substring (if any).
    if (char === '(') {
      stack.push(length);
      // Make sure to reset length counter since we can't say for sure whether current opening bracket will be
      // properly closed.
      length = 0;
    }
    // Current bracket is ')'.
    else if (stack.length) {
      // Read bracket and length of adjacent valid substring (if any).
      const adjacentLength = stack.pop()!;

      // There is a matching opening bracket => increment length by 2 and add adjacent length (if any).
      length += adjacentLength + 2;

      // Check whether max length should be changed.
      if (length >= result) {
        result = length;
      }
      // Nothing in the stack => The substring is no longer valid => reset valid substring length.
    } else {
      length = 0;
    }
  }

  return result;
}
