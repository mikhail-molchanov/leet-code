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

// OK, so after thinking for like an hour I guess I figured something out:
// - Going row by row as in the previous approach is very inefficient. Imagine an input of [10000, 0, 10000].
//   In order to get to the answer we'll have to iterate 10000 times. There must be something more elegant.
// - Let's go by columns instead of rows.
// - Now the tricky part, it's really needed to be visualized but anyway:
//   - Go from left to right and for every index calculate current maximum value.
//   - Go from right to left and do the same.
//   - Now we have 2 lists with maximums in both directions (they will be different, draw a sample graph and you'll get it).
//   - Now for every index we have 2 maximums, get a minimum value. Here is the catch:
//     THIS IS GONNA BE THE HIGHEST VALUE THE WATER CAN GO UP FOR THE CURRENT INDEX.
//   - Now we just have to subtract actual height at this index from the value above.
//     This is gonna be an amount of water above current index.
// - Cool thing about it is that we can do all of the above in one pass:
//   - Go in opposite directions simultaneously
//   - Once for specific value we have both left/right maximums we can already calculate the water amount =)
export function trap2(height: number[]): number {
  let maxLeft = 0;
  const maxLeftList: number[] = [];

  let maxRight = 0;
  const maxRightList: number[] = [];

  let amount = 0;

  for (let i = 0; i < height.length; i++) {
    // Go left to right and fill left => right list.
    const left = height[i];
    if (left > maxLeft) {
      maxLeft = left;
    }

    maxLeftList[i] = maxLeft;

    // If we already have right to left value for "i" => we can already
    // calculate the amount and add it to the overall value.
    if (maxRightList[i]) {
      const min = Math.min(maxLeftList[i], maxRightList[i]);
      amount += min - left;
    }

    // Go right to left at the same time.
    const j = height.length - i - 1;
    const right = height[j];
    if (right > maxRight) {
      maxRight = right;
    }

    maxRightList[j] = maxRight;

    // If we already have left to right value for "j" => we can already
    // calculate the amount and add it to the overall value.
    if (maxLeftList[j]) {
      const min = Math.min(maxLeftList[j], maxRightList[j]);
      amount += min - right;
    }
  }

  return amount;
}
