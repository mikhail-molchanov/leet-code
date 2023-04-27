/**
 * Problem description:
 * https://leetcode.com/problems/ransom-note/
 */

// First intuition:
// - Construct alphabet from "magazine" as map of char => num available.
// - Go through "ransomNote" and take letters from alphabet one by one.
// - If at some step there is no letters available in the alphabet => return false.
// Problems:
// - "magazine" can be quite long and "ransomNote" can be short so we'll spend
//   a lot of time constructing the dictionary while only small part of it is really needed.
// Instead we can construct the dictionary on demand.
//
// Algorithm:
// - Take a letter from "ransomNote"
// - Look it up in the dictionary. If it is available - move to the next letter.
//   If it is not available, go through "magazine" until it is found while constructing the dictionary for other letters.
export function canConstruct(ransomNote: string, magazine: string): boolean {
  // Dictionary of letters in "magazine" along with number of them available.
  const dictionary = new Map<string, number>();

  // Current letter index from ransom note.
  let ransomLetterIndex = 0;
  // Current letter index from magazine.
  let magazineLetterIndex = 0;

  // Iterate over ransom note.
  while (ransomLetterIndex < ransomNote.length) {
    // Current letter from ransom note.
    let ransomLetter = ransomNote[ransomLetterIndex];

    // Check if it is already available in the dictionary.
    let numAvailable = dictionary.get(ransomLetter);

    // If it is in the dictionary - use one item and move to the next letter.
    if (numAvailable && numAvailable > 0) {
      numAvailable--;
      dictionary.set(ransomLetter, numAvailable);
    } else {
      // If it is not in the dictionary.
      let found = false;

      // Iterate magazine until letter is found.
      // Put other letters along the way in the dictionary.
      for (; magazineLetterIndex < magazine.length; magazineLetterIndex++) {
        let magazineLetter = magazine[magazineLetterIndex];

        // Letter is found in magazine. Move magazine index and break.
        if (ransomLetter === magazineLetter) {
          found = true;
          magazineLetterIndex++;
          break;
        }

        // Add magazine letter to the dictionary.
        let numAvailable = dictionary.get(magazineLetter) || 0;
        dictionary.set(magazineLetter, ++numAvailable);
      }

      if (!found) {
        // We reached the end of the magazine. Letter was not found, neither it is available in the dictionary =>
        // End of the algorithm.
        return false;
      }
    }

    // Move to next ransom letter.
    ransomLetterIndex++;
  }

  //
  return true;
}
