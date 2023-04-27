import { linkedListFromArray, linkedListToArray } from '../../shared/utils';
import { addTwoNumbers } from './addTwoNumbers';

describe('Add Two Numbers', () => {
  test.each([
    [
      [2, 4, 3],
      [5, 6, 4],
      [7, 0, 8],
    ],
    [[0], [0], [0]],
    [[0], [1, 2], [1, 2]],
    [
      [9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9],
      [8, 9, 9, 9, 0, 0, 0, 1],
    ],
  ])('add number %p to number %p: %p', (a1, a2, sum) => {
    const l1 = linkedListFromArray(a1);
    const l2 = linkedListFromArray(a2);
    const result = linkedListToArray(addTwoNumbers(l1, l2));
    expect(result).toEqual(sum);
  });
});
