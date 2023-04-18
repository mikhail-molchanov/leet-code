import { ListNode, linkedListFromArray, linkedListToArray } from '../../shared/utils';

import { mergeTwoLists } from './mergeTwoSortedLists';

describe('linked list utils', () => {
  test('converts array from and to linked list', () => {
    const input = [2, 3, 1, 4];
    expect(linkedListToArray(linkedListFromArray(input))).toEqual(input);
  });
});

describe('Merge Two Sorted Lists', () => {
  test.each([
    [[], [], []],
    [[], [0], [0]],
    [
      [1, 2, 4],
      [1, 3, 4],
      [1, 1, 2, 3, 4, 4],
    ],
    [
      [1, 1, 1],
      [2, 2, 2],
      [1, 1, 1, 2, 2, 2],
    ],
  ])('merge %p with %p: %p', (list1, list2, result) => {
    const resultList = mergeTwoLists(linkedListFromArray(list1), linkedListFromArray(list2));
    expect(linkedListToArray(resultList)).toEqual(result);
  });
});
