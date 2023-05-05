/**
 * Problem description:
 * https://leetcode.com/problems/spiral-matrix/
 */

// Algorithm:
// - Start at [0, 0] and move to the right
// - When either end of the matrix or already processed index is ahead then change direction 90 degree clockwise.
// - When there is nowhere to move => end of the algorithm.
//
// Do determine already processed indexes we can:
// - Modify input matrix
// - Have another matrix of the same size
// - Use Set
//
// Alternatively we can maintain number of available horizontal / vertical steps
// since we know that after each rotation number of available steps in opposite direction is gonna decrease by 1.
export function spiralOrder(matrix: number[][]): number[] {
  // Resulting array.
  const result: number[] = [];

  // Max amount of steps available along Y axis.
  let maxStepsY = matrix.length;
  // Max amount of steps available along X axis.
  let maxStepsX = matrix[0].length;

  // Starting position.
  let [y, x] = [0, 0];

  // Starting direction: move 1 step at a time along X axis.
  let [stepY, stepX]: Direction = [0, 1];

  // Max amount of steps along current axis.
  let maxSteps = maxStepsX;

  // Since we're moving along X axis => number of steps along Y axis after next direction change should be reduced by 1.
  maxStepsY--;

  // Move until there are available steps in current direction.
  while (maxSteps) {
    // Add item at current position.
    result.push(matrix[y][x]);

    // Use on step.
    maxSteps--;

    // No more steps left along current axis => Need to change direction.
    if (!maxSteps) {
      // Change direction 90 clockwise.
      [stepY, stepX] = changeDirection([stepY, stepX]);

      // Depending on new direction (horz vs vert) adjust number of available steps along opposite axis.
      if (stepY === 0) {
        maxSteps = maxStepsX;
        maxStepsY--;
      } else {
        maxSteps = maxStepsY;
        maxStepsX--;
      }
    }

    // Change position according to new direction.
    // If "maxSteps" here is 0 after direction change then the loop will be terminated.
    [y, x] = [y + stepY, x + stepX];
  }

  return result;
}

type Direction = [-1 | 0 | 1, -1 | 0 | 1];

// Rotate direction 90 degrees clockwise.
const changeDirection = (direction: Direction): Direction => {
  const [y, x] = direction;
  // Right => Down.
  if (y === 0 && x === 1) {
    return [1, 0];
    // Down => Left
  } else if (y === 1 && x === 0) {
    return [0, -1];
    // Left => Up.
  } else if (y === 0 && x === -1) {
    return [-1, 0];
    // Up => Right.
  } else if (y === -1 && x === 0) {
    return [0, 1];
  }

  throw 'Invalid vector to rotate';
};
