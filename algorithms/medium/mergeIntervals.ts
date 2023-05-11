/**
 * Problem description:
 * https://leetcode.com/problems/merge-intervals/
 */

// Algorithm:
// - Sort the intervals.
// - For each interval try to merge it with the next one.
// - If it can be merged then do it but don't add it to resulting array, pick next interval.
// - If it can't be merged then add it to the resulting array and pick another pair of interval/next interval(candidate).
//   !!! The trick is that since intervals are sorted then if current interval can't be merged with the next one
//   then it can't be merged with the rest of them.
export function merge(intervals: number[][]): number[][] {
  // Sort intervals by "start" component.
  intervals = [...intervals].sort(([a], [b]) => a - b);

  let result: number[][] = [];

  // Maintain current and next (candidate) intervals. Start from the first one.
  let interval = intervals[0];
  let index = 1;

  while (index < intervals.length) {
    // This is next interval to the current one.
    const candidate = intervals[index];

    // Check if candidates head falls into current interval (inclusive).
    let merge = candidate[0] >= interval[0] && candidate[0] <= interval[1];

    // If current interval can be merged with the next one then merge it but don't add to the resulting array.
    // Check if it can be merged further with other intervals.
    if (merge) {
      interval = [Math.min(interval[0], candidate[0]), Math.max(interval[1], candidate[1])];
    } else {
      // Current interval can't be merged with the next one AND WITH THE REST OF THE INTERVALS (thanks to sorting).
      // Add it to resulting array and set new pair of current / candidate intervals.
      result.push(interval);
      interval = candidate;
    }

    index++;
  }

  // Deal with the leftovers =)
  result.push(interval);

  return result;
}
