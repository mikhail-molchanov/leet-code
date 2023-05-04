/**
 * Problem description:
 * https://leetcode.com/problems/rotate-image/
 */

// The fastest solution from LeetCode does require some knowledge of how this problem is solved from math point of view.
// It takes 2 steps: transpose + swap columns.

// Solution implemented below is much slower: we rotate perimeter and then proceed with the matrix of a smaller size.
export function rotate(matrix: number[][], offset = 0): void {
  // Keep rotating perimeters until we reach center of the matrix.
  while (rotatePerimeter(matrix, offset)) offset++;
}

// Offset is a "depth" of the perimeter.
const getReplacements = (index: number, size: number, offset: number) => [
  [offset, index + offset],
  [index + offset, size - 1 + offset],
  [size - 1 + offset, size - index - 1 + offset],
  [size - 1 - index + offset, offset],
  [offset, index + offset],
];

export function rotatePerimeter(matrix: number[][], offset = 0): boolean {
  // Size of inner matrix of the original one for the given depth offset.
  const size = matrix[0].length - 2 * offset;

  // Rotating empty matrix or a matrix of size 1 is the matrix itself.
  if (size <= 1) {
    return false;
  }

  // For every item in the first row except the last one we perform full rotation cycle (4 steps).
  for (let i = 0; i < size - 1; i++) {
    const replacements = getReplacements(i, size, offset);

    let [row, col] = replacements[0];
    let value = matrix[row][col];

    for (let j = 1; j <= 4; j++) {
      let [rotatedRow, rotatedCol] = replacements[j];
      const temp = matrix[rotatedRow][rotatedCol];
      matrix[rotatedRow][rotatedCol] = value;
      value = temp;
    }
  }

  return true;
}
