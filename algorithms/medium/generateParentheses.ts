/**
 * Problem description:
 * https://leetcode.com/problems/generate-parentheses/
 */
export function generateParenthesis(n: number): string[] {
  // Resulting array.
  let result: string[] = [];

  // s - current (partial) string
  // opening - number of opening brackets left in stack
  // closing - number of closing brackets left in stack
  // notClosed - number of opening brackets that appear in "s" that need to be closed.
  const generate = (s: string, opening: number, closing: number, notClosed = 0) => {
    // Both stacks are empty => sequence is complete.
    if (!opening && !closing) {
      result.push(s);
      return;
    }

    // On any step we can add opening bracket if there is any left in the stack.
    // Repeat itself by adjusting "opening" and "notClosed" counters:
    // - We used one opening bracket => new count is opening - 1
    // - We used one opening bracket => the is one more to close => notClosed + 1
    if (opening > 0) {
      generate(s + '(', opening - 1, closing, notClosed + 1);
    }

    // On any step we can add closing bracket it:
    // - There is at least one opening bracket that needs to be closed (notClosed > 0)
    // - There is enough closing brackets in the stack to close both opening brackets
    //   in the stack and those that has already been added.
    // Repeat itself by adjusting "closing" and "notClosed" counters:
    // - We used one closing bracket => new count is closing - 1
    // - We used one closing bracket => there is one less left to close => notClose - 1
    if (notClosed > 0 && closing - opening - notClosed >= 0) {
      generate(s + ')', opening, closing - 1, notClosed - 1);
    }
  };

  // Start recursive algorithm with both opening and closing brackets stacks containing N elements.
  generate('', n, n);

  return result;
}
