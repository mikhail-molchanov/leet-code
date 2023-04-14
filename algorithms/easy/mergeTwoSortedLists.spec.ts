import { ListNode, mergeTwoLists } from './mergeTwoSortedLists';

// Helper functions to be able to write tests in array notation.
const linkedListFromArray = (array: number[]): ListNode | null => {
  if (!array.length) {
    return null;
  }

  let head: ListNode | null = null;
  let node: ListNode | null = null;

  for (let value of array) {
    const prev = node;
    node = new ListNode(value);

    if (prev) {
      prev.next = node;
    } else {
      head = node;
    }
  }

  return head;
};

const linkedListToArray = (list: ListNode | null) => {
  const result: number[] = [];

  while (list) {
    result.push(list.val);
    list = list.next;
  }

  return result;
};

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
