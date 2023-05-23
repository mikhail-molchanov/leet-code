/**
 * Problem description:
 * https://leetcode.com/problems/sudoku-solver/
 */

/**
 Do not return anything, modify board in-place instead.
 */
// Intuition:
// 1. Go through the board and fill the matrix where each cell has potential set of numbers (candidates).
// 2. Maintain a list of unsolved cells, once the list is empty => problem is solved.
// 3. If on any step some cell can't be filled => the path was wrong
// 4. On each step if some digit can't be used in particular cell => remove it from the potential set.
// 5. How to maintain rolling back operation? How to speed things up?
// 6. On every step start from the cell with minimum number of numbers in candidates.
export function solveSudoku(board: string[][]): void {
  const temp = initialize(board);
  solve(temp);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = temp[i][j] as string;
    }
  }
}

const initialize = (board: string[][]): (string | string[])[][] => {
  const rowNumbers: string[][] = [];
  const columnNumbers: string[][] = [];
  const squareNumbers: string[][][] = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];

      const squareI = Math.floor(i / 3);
      const squareJ = Math.floor(j / 3);

      if (!squareNumbers[squareI]) {
        squareNumbers[squareI] = [];
      }

      if (!squareNumbers[squareI][squareJ]) {
        squareNumbers[squareI][squareJ] = [];
      }

      if (item !== '.') {
        if (!rowNumbers[i]) {
          rowNumbers[i] = [];
        }

        rowNumbers[i].push(item);

        if (!columnNumbers[j]) {
          columnNumbers[j] = [];
        }

        columnNumbers[j].push(item);

        squareNumbers[squareI][squareJ].push(item);
      }
    }
  }

  const temp: (string | string[])[][] = new Array(9).fill(0).map(v => new Array(9));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];
      if (item === '.') {
        let candidates = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

        rowNumbers[i].forEach(item => (candidates = candidates.filter(v => v !== item)));
        columnNumbers[j].forEach(item => (candidates = candidates.filter(v => v !== item)));

        const squareI = Math.floor(i / 3);
        const squareJ = Math.floor(j / 3);

        squareNumbers[squareI][squareJ].forEach(
          item => (candidates = candidates.filter(v => v !== item))
        );
        temp[i][j] = candidates;
      } else {
        temp[i][j] = item;
      }
    }
  }

  return temp;
};

const solve = (board: (string | string[])[][]): boolean => {
  let iteration = 1;
  const copy = cloneBoard(board);

  // console.log('solving: ', copy);

  try {
    while (iterate(copy) && iteration < 100) {
      // console.log('iteration N: ', iteration);
      iteration++;
    }
  } catch (e) {
    return false;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = copy[i][j];
    }
  }

  // console.log(board);

  return true;
};

const iterate = (board: (string | string[])[][]) => {
  let minUnresolved = 10;
  let minUnresolvedLocation: [number, number] | undefined;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];
      if (typeof item !== 'string') {
        if (item.length < minUnresolved) {
          minUnresolved = item.length;
          minUnresolvedLocation = [i, j];
        }
      }
    }
  }

  if (minUnresolvedLocation) {
    // console.log('minUnresolvedLocation: ', minUnresolvedLocation);
    if (!solveAt(board, minUnresolvedLocation)) {
      throw new Error('Bla');
    }
    return true;
  }

  return false;
};

const solveAt = (board: (string | string[])[][], location: [number, number]): boolean => {
  const [x, y] = location;
  const item = board[x][y];

  // console.log('solve at: ', item, x, y);

  if (typeof item === 'string') {
    return true;
  }

  const [value] = item;
  if (item.length === 1) {
    return tryCandidate(board, location, value);
  } else {
    let candidates = item;
    for (let candidate of candidates) {
      const copy = cloneBoard(board);
      if (tryCandidate(copy, location, candidate) && solve(copy)) {
        // console.log('resolved sub-path');

        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            board[i][j] = copy[i][j];
          }
        }
        return true;
      } else {
        //console.error('sub-path is invalid: ', candidate, x, y);
      }
    }
  }

  return false;
};

const cloneBoard = (board: (string | string[])[][]) => {
  return JSON.parse(JSON.stringify(board)) as (string | string[])[][];
};

const tryCandidate = (
  board: (string | string[])[][],
  location: [number, number],
  value: string
) => {
  const deleteFromArray = (array: string | string[]) => {
    if (typeof array === 'string') {
      return true;
    }

    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }

    return array.length > 0;
  };

  const copy = cloneBoard(board);

  const [x, y] = location;
  copy[x][y] = value;

  // console.log('try candidate: ', value, location);

  for (let a = 0; a < 9; a++) {
    if (!deleteFromArray(copy[x][a])) {
      return false;
    }
  }

  for (let a = 0; a < 9; a++) {
    if (!deleteFromArray(copy[a][y])) {
      return false;
    }
  }

  const squareI = Math.floor(x / 3);
  const squareJ = Math.floor(y / 3);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (!deleteFromArray(copy[squareI * 3 + x][squareJ * 3 + y])) {
        return false;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = copy[i][j];
    }
  }

  // console.log('board after try candidate: ', board);

  return true;
};
