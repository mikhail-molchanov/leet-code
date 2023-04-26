import { linkedListFromArray, linkedListToArray } from '../../shared/utils';

import { reverseList, reverseList2 } from './reverseLinkedList';

describe('Reverse Linked List', () => {
  test.each([
    [[], []],
    [[1], [1]],
    [
      [1, 2, 3, 4],
      [4, 3, 2, 1],
    ],
  ])('reversed linked list %p: %p', (listArray, reversedArray) => {
    const list = linkedListFromArray(listArray);

    const result = linkedListToArray(reverseList(list));
    expect(result).toEqual(reversedArray);

    const list2 = linkedListFromArray(listArray);
    const result2 = linkedListToArray(reverseList2(list2));
    expect(result2).toEqual(reversedArray);
  });
});
