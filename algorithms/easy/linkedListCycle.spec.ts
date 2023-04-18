import { linkedListFromArray } from '../../shared/utils';

import { hasCycle } from './linkedListCycle';

describe('Linked List Cycle', () => {
  test.each([
    [[1, 2, 3], -1, false],
    [[3, 2, 0, -4], 1, true],
    [[1, 2], 0, true],
    [[1], -1, false],
  ])('linked list %p with tail pointing to %p is cycled: %p', (array, cycleAt, result) => {
    const list = linkedListFromArray(array, cycleAt);
    expect(hasCycle(list)).toEqual(result);
  });
});
