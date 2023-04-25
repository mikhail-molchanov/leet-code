import { linkedListFromArray, linkedListToArray } from '../../shared/utils';

import { removeElements } from './removeLinkedListElements';

describe('Remove Linked List Elements', () => {
  test.each([
    [[], 1, []],
    [[7, 7, 7, 7], 7, []],
    [[1, 2, 6, 3, 4, 5, 6], 6, [1, 2, 3, 4, 5]],
    [[1, 2, 6, 1, 1, 5, 1], 1, [2, 6, 5]],
  ])('linked list %p after removal of elements equal %p: %p', (inputArray, value, outputArray) => {
    const input = linkedListFromArray(inputArray);
    const result = linkedListToArray(removeElements(input, value));
    expect(result).toEqual(outputArray);
  });
});
