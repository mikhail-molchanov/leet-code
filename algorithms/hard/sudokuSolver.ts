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
  const rowNumbers: number[][] = [];
  const columnNumbers: number[][] = [];
  const squareNumbers: number[][][] = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];
      if (item !== '.') {
        const num = parseInt(item);
        if (!rowNumbers[i]) {
          rowNumbers[i] = [];
        }

        rowNumbers[i].push(num);

        if (!columnNumbers[j]) {
          columnNumbers[j] = [];
        }

        columnNumbers[j].push(num);

        const squareI = Math.floor(i / 3);
        const squareJ = Math.floor(j / 3);

        if (!squareNumbers[squareI]) {
          squareNumbers[squareI] = [];
        }

        if (!squareNumbers[squareI][squareJ]) {
          squareNumbers[squareI][squareJ] = [];
        }

        squareNumbers[squareI][squareJ].push(num);
      }
    }
  }

  const result: (number | Set<number>)[][] = new Array(9).fill(0).map(v => new Array(9));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const item = board[i][j];
      if (item === '.') {
        const candidates = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        rowNumbers[i].forEach(item => candidates.delete(item));
        columnNumbers[j].forEach(item => candidates.delete(item));
        const squareI = Math.floor(i / 3);
        const squareJ = Math.floor(j / 3);
        squareNumbers[squareI][squareJ].forEach(item => candidates.delete(item));
        result[i][j] = candidates;
      } else {
        result[i][j] = parseInt(item);
      }
    }
  }

  const iterate = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const item = result[i][j];
        if (typeof item !== 'number') {
          if (item.size === 1) {
            item.forEach(value => (result[i][j] = value));
            const num = result[i][j] as number;

            for (let a = 0; a < 9; a++) {
              const item = result[i][a];
              if (typeof item != 'number') {
                item.delete(num);
              }
            }

            for (let a = 0; a < 9; a++) {
              const item = result[a][j];
              if (typeof item != 'number') {
                item.delete(num);
              }
            }

            const squareI = Math.floor(i / 3);
            const squareJ = Math.floor(j / 3);

            for (let x = 0; x < 3; x++) {
              for (let y = 0; y < 3; y++) {
                const item = result[squareI * 3 + x][squareJ * 3 + y];
                if (typeof item !== 'number') {
                  item.delete(num);
                }
              }
            }

            return false;
          }
        }
      }
    }

    return true;
  };

  let iteration = 1;
  while (!iterate() && iteration < 1000) {
    iteration++;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = (result[i][j] as number).toString();
    }
  }
}
