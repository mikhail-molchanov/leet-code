/**
 * Problem description:
 * https://leetcode.com/problems/sudoku-solver/
 */

/**
 Do not return anything, modify board in-place instead.
 */
// Intuition:
// 1. Go through the board and fill the matrix where each cell has potential set of numbers (candidates).
// 2. Optimization: maintain a list of unsolved cells, once the list is empty => problem is solved.
// 3. If on any step some cell can't be filled => the path was wrong
// 4. On each step if some digit can't be used in particular cell => remove it from the potential set.
// 5. On every step start from the cell with minimum number of numbers in candidates.
export function solveSudoku(board: string[][]): void {
  // Given initial set of numbers fill in potential candidates for every empty cell.
  initialize(board);

  // Solve the board.
  solve(board);
}

const removeDigits = (source: string, digits: string) =>
  new Array(digits).forEach(digit => source.replace(digit, ''));

// Given initial set of numbers fill in potential candidates for every empty cell.
// Done in 2 passes:
// - Collect already used numbers for each row, column and square.
// - Use this information to fill in available numbers for empty cells.
const initialize = (board: string[][]) => {
  const rows: string[] = new Array(9).fill('');
  const columns: string[] = new Array(9).fill('');
  const squares: string[][] = new Array(3).fill(null).map(v => new Array(3).fill(''));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];

      if (item !== '.') {
        rows[i] += item;
        columns[j] += item;
        squares[Math.floor(i / 3)][Math.floor(j / 3)] += item;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];
      if (item === '.') {
        const alreadyUsed = rows[i] + columns[j] + squares[Math.floor(i / 3)][Math.floor(j / 3)];
        new Array(...'123456789').forEach(digit => {
          if (!alreadyUsed.includes(digit)) {
            board[i][j] += digit;
          }
        });
      }
    }
  }
};

const solve = (board: string[][]): boolean => {
  // Just for the case let's have an emergence condition to not stuck in the endless loop.
  let iteration = 1;

  try {
    while (iterate(board) && iteration < 1000) {
      iteration++;
    }
  } catch (e) {
    return false;
  }

  return true;
};

// 1. Find cell with minimum number of potential candidates (ideally one candidate).
// 2. Try to use first available candidate (update corresponding row, column and square).
// 3. If there is more than once candidate => use first one and solve the new board recursively.
const iterate = (board: string[][]) => {
  let min = 9;
  let cell: [number, number] | undefined;

  for (let i = 0; i < 9 && min !== 1; i++) {
    for (let j = 0; j < 9 && min !== 1; j++) {
      const item = board[i][j];
      if (item[0] === '.') {
        const num = item.length - 1;
        if (num < min) {
          min = num;
          cell = [i, j];
        }
      }
    }
  }

  if (cell) {
    // Try to solve the board by using found cell.
    if (!solveAt(board, cell)) {
      throw new Error('Could not solve the board');
    }

    return true;
  }

  // If the is no more cells with candidates => iterations are finished.
  return false;
};

// Depending on number of candidates available in specified "cell" we should:
// - For single candidate case => try to use it and see whether the board can be update according to the new value
// - For multiple candidates case => repeat same steps as for single case and then try to solve the updated board recursively.
const solveAt = (board: string[][], cell: [number, number]): boolean => {
  const [x, y] = cell;
  const item = board[x][y];

  // Just for the case. Cell is already solved.
  if (item[0] !== '.') {
    return true;
  }

  const candidates = item.slice(1);

  // For single candidates there is no need to solve the board recursively.
  if (candidates.length === 1) {
    return tryCandidate(board, cell, candidates[0]);
  }

  for (let candidate of candidates) {
    // We need to preserve current board state when doing recursive iterations since all the changes are done in place
    // and some candidate path might be wrong.
    const copy = cloneBoard(board);
    if (tryCandidate(copy, cell, candidate) && solve(copy)) {
      // Apply the solved board back to current one.
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          board[i][j] = copy[i][j];
        }
      }
      return true;
    } else {
      //.error('sub-path is invalid: ', candidate, x, y);
    }
  }

  return false;
};

const cloneBoard = (board: string[][]) => {
  return JSON.parse(JSON.stringify(board)) as string[][];
};

// Place candidate into specified cell and remove it from corresponding row, column and square.
// If at some point some cell becomes "empty" it means that candidate can't be used to solve the puzzle.
const tryCandidate = (board: string[][], cell: [number, number], candidate: string) => {
  const removeCandidate = (cell: [number, number]) => {
    const [x, y] = cell;
    const candidates = board[x][y];

    if (candidates[0] != '.') {
      return true;
    }

    board[x][y] = candidates.replace(candidate, '');
    return candidates.length > 1;
  };

  const [x, y] = cell;
  board[x][y] = candidate;

  for (let i = 0; i < 9; i++) {
    if (!removeCandidate([x, i])) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!removeCandidate([i, y])) {
      return false;
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!removeCandidate([Math.floor(x / 3) * 3 + i, Math.floor(y / 3) * 3 + j])) {
        return false;
      }
    }
  }

  return true;
};
