/**
 * Problem description:
 * https://leetcode.com/problems/trapping-rain-water/
 */

// Intuition:
// - Go by rows starting from the bottom, end algorithm when there is no more terrain on level X.
// - Detect regions that are surrounded by terrain to the left and right and has at least on empty block above
//   for the water to get in.
// Optimization 1:
// - It seems like we don't have to check the "above" blocks meaning that elevation map doesn't have caveats.
// Optimization 2:
// - Since terrain can't "levitate" over nothing we can narrow scan area on every iteration.
export function trap(height: number[]): number {
  let amount = 0;

  let scanFrom = 0;
  let scanTo = height.length;

  // On each iteration we need two rows: current and next one (above).
  const iterate = (index: number): boolean => {
    let prev = false;
    let start = 0;

    // console.log('iterate range: ', scanFrom, scanTo);

    let firstTerrainIndex: number | undefined;
    let lastTerrainIndex: number | undefined;

    for (let i = scanFrom; i < scanTo; i++) {
      const current = height[i] > index;

      if (current) {
        if (firstTerrainIndex === undefined) {
          firstTerrainIndex = i;
        }
        // If next row is not empty we'll need to continue iterations.
        lastTerrainIndex = i;
      }

      // Terrain.
      if (current) {
        if (start) {
          amount += i - start;
        }

        start = 0;
      }
      // Empty block.
      else {
        // Previous block was terrain => mark start of the region.
        if (prev) {
          start = i;
        }
      }

      prev = current;
    }

    // console.log('scanning range: ', scanFrom, scanTo);
    if (firstTerrainIndex !== undefined) {
      scanFrom = firstTerrainIndex;
      // console.log('updating scanFrom: ', firstTerrainIndex);
    }

    if (lastTerrainIndex !== undefined) {
      scanTo = lastTerrainIndex + 1;
      // console.log('updating scanTo: ', lastTerrainIndex);
    }

    return !!firstTerrainIndex || !!lastTerrainIndex;
  };

  let index = 0;
  while (iterate(index)) {
    index++;
  }

  return amount;
}
