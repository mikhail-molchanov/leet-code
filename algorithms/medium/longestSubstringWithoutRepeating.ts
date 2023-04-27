/**
 * Problem description:
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */

// The algorithm:
// - Iterate every character from the beginning.
// - Find longest substring that starts from current character.
// - How to speed up this process using information collected on the previous step:
//   - Collect a set of characters that form longest substring
//   - On the next step start from the end of the longest substring from previous step
//     since we already know from previous step what characters were there before.
//   Thus each character will only be placed ONCE in the set.
// Optimize a bit more:
//   - If on some step we see that amount of characters left from current index to the end of the string
//   is less than current longest substring, we can break since we're not gonna beat that.
export function lengthOfLongestSubstring(s: string): number {
  // This the final result.
  let longest = 0;

  // A set of unique characters that we collect on each step.
  const set = new Set<string>();

  // Longest substring from the previous step.
  let prevLongest = 1;

  // On each step we're gonna find longest substring that STARTS from "index".
  let index = 0;

  // If at some point there is not enough characters left to beat current longest substring, we can safely quit.
  while (index + longest < s.length) {
    // We moved to the next character, so we know for sure that longest string at current position is at least
    // previous longest minus one.
    let curLongest = prevLongest - 1;

    // So there is no point to start from current index, we can jump to the end of the previous longest string.
    let pos = index + curLongest;

    // Remember letter at current index in order to remove it from set before moving to the next index.
    const firstLetter = s[index];

    // Read letters until either duplicate character is found or string end is detected.
    let letter = s[pos];

    while (!set.has(letter) && pos < s.length) {
      set.add(letter);
      pos++;
      letter = s[pos];
      curLongest++;
    }

    // Adjust "longest" value if we can beat it from current index.
    if (curLongest > longest) {
      longest = curLongest;
    }

    // Remember the value for the next step.
    prevLongest = curLongest;

    // Since we shift to the next index, we have to exclude letter at current index from the set.
    set.delete(firstLetter);

    index++;
  }

  return longest;
}
