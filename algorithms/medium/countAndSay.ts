/**
 * Problem description:
 * https://leetcode.com/problems/count-and-say/
 */

export function countAndSay(n: number): string {
  // For n = 1 the answer is already defined...
  let result = '1';

  // ... so we can start from step 2.
  for (let i = 2; i <= n; i++) {
    result = countAndSayFor(result.toString());
  }

  return result;
}

function countAndSayFor(num: string): string {
  let result = '';

  let prevDigit = num[0];
  let count = 1;

  // Consume one letter at a time starting from the second one.
  // Compare it with the previous one and either:
  // - Add it to the result if previous one was different
  // - Increment the counter if previous one was the same.
  for (let i = 1; i < num.length; i++) {
    let digit = num[i];
    if (digit === prevDigit) {
      count++;
    } else {
      result += count.toString() + prevDigit;
      // Reset the counter and prevDigit.
      count = 1;
      prevDigit = digit;
    }
  }

  // Deal with the last letter in the sequence.
  result += count.toString() + prevDigit;

  return result;
}
