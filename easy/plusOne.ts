// Assumption is that operation should be performed IN PLACE.
// Otherwise (if copy is needed) the algorithm can be a bit more compact.

// Option 1 (most straightforward but slow): covert array to number, add one, convert back to array.
// Option 2: recursion.
export function plusOne(digits: number[], pos = digits.length - 1): number[] {
  // "pos" is position in the array where we need to add one to the current digit.
  // If pos < 0 then we need to insert it in the beginning of the array.
  if (pos < 0) {
    digits.unshift(1);
    return digits;
  }

  // Get last digit and increment it.
  let lastDigit = digits[pos];
  lastDigit += 1;

  let overflow = false;

  // Check if we got an overflow and adjust the digit accordingly.
  if (lastDigit >= 10) {
    lastDigit = lastDigit - 10;
    overflow = true;
  }

  // Replace digit at current position with the new value.
  digits[pos] = lastDigit;

  // In case of overflow we need to repeat the algorithm for the rest of the array.
  return overflow ? plusOne(digits, pos - 1) : digits;
}
