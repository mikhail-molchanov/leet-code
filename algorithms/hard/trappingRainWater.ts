/**
 * Problem description:
 * https://leetcode.com/problems/trapping-rain-water/
 */

// Intuition:
// - Go by rows starting from the bottom, end algorithm when there is no more terrain on level X.
// - Detect regions that are surrounded by terrain to the left and right and has at least on empty block above
//   for the water to get in.
export function trap(height: number[]): number {
  let amount = 0;

  // On each iteration we need two rows: current and next one (above).
  const iterate = (index: number): boolean => {
    let result = false;

    let prev = false;
    let start = 0;
    let hasEmptyAbove = false;

    for (let i = 0; i < height.length; i++) {
      const current = height[i] > index;
      const above = height[i] > index + 1;

      if (above) {
        // If next row is not empty we'll need to continue iterations.
        result = true;
      }

      // Terrain.
      if (current) {
        if (start && hasEmptyAbove) {
          amount += i - start;
        }

        start = 0;
        hasEmptyAbove = false;
      }
      // Empty block.
      else {
        // Previous block was terrain => mark start of the region.
        if (prev) {
          start = i;
        }

        if (start && !above) {
          hasEmptyAbove = true;
        }
      }

      prev = current;
    }

    return result;
  };

  let index = 0;
  while (iterate(index)) {
    index++;
  }

  return amount;
}
