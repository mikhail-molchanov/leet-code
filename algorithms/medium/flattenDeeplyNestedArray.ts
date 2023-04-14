/**
 * Problem description:
 * https://leetcode.com/problems/flatten-deeply-nested-array/
 */

type MultiDimensionalArray = (number | MultiDimensionalArray)[];

export function flat(arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  const result: MultiDimensionalArray = [];

  const iterate = (arr: MultiDimensionalArray, depth: number) => {
    arr.forEach(item => {
      // All numbers can't be flattened.
      // Do not process arrays that have their depth under specified limit.
      if (typeof item === 'number' || depth === 0) {
        result.push(item);
      } else {
        // Flatten nested arrays recursively.
        iterate(item, depth - 1);
      }
    });
  };

  iterate(arr, n);

  return result;
}
