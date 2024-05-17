/**
 * Problem description:
 * https://leetcode.com/problems/largest-rectangle-in-histogram/
 */

// Naive approach: scan bottom to top based on distinct height values.
// Didn't pass the LeetCode tests, too slow for large arrays.
// The more distinct values in the arrays, the more this algorithm suffers.
export function largestRectangleArea(heights: number[]): number {
  // get sorted distinct heights
  const distinctHeights: Set<number> = new Set([...heights].sort((a, b) => a - b));

  let maxArea = 0;

  let left = 0;
  let right = heights.length - 1;

  distinctHeights.forEach(height => {
    let firstPositive = -1;
    let lastPositive = 0;

    let max = 0;
    let current = 0;

    for (let i = left; i <= right; i++) {
      // Get length of longest sequence of 1s.
      const val = heights[i] >= height;

      if (val) {
        current++;

        if (firstPositive === -1) {
          firstPositive = i;
        }

        lastPositive = i;
      }

      if (!val || i === right) {
        if (current > max) {
          max = current;
        }

        current = 0;
      }
    }

    left = firstPositive;
    right = lastPositive;

    const area = max * height;

    // console.log(`height: ${height} area: ${area}`);

    if (area > maxArea) {
      maxArea = area;
    }
  });

  return maxArea;
}

type Rect = {
  position: number;
  height: number;
  area: number;
  final: boolean;
};

export function largestRectangleArea2(heights: number[]): number {
  let result = 0;
  let prevHeight = 0;

  const rectangles1 = getRectangles(heights);
  const rectangles2 = getRectangles(heights.reverse());

  // for (let i = 0; i < heights.length; i++) {
  //   const rect1 = rectangles1[i];
  //   const rect2 = rectangles2[i];
  //   let area = rect1.area + rect2.area - rect1.height;
  // }

  console.log('rectangles1: ', rectangles1);
  // console.log('rectangles2: ', rectangles2);

  return result;
}

function getRectangles(heights: number[]) {
  let prevHeight = 0;

  const rectangles: Rect[] = [];

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];

    rectangles.forEach(rect => {
      if (!rect.final) {
        if (rect.height <= height) {
          rect.area += rect.height;
        } else {
          rect.final = true;
        }
      }
    });

    if (height != prevHeight) {
      rectangles.push({ position: i, height, area: height, final: false });
    }

    prevHeight = height;
  }

  console.log('rectangles: ', rectangles);
  return rectangles;
}
