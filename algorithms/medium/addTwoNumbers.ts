/**
 * Problem description:
 * https://leetcode.com/problems/add-two-numbers/
 */

import { ListNode } from '../../shared/utils';

// Description doesn't state whether we should return new list or not (e.g. we can re-use parts of existing lists).
// Let's assume that new list should be created.
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // These are pointers that we're gonna synchronously move for each list.
  let p1 = l1;
  let p2 = l2;

  // This is a head of resulting list.
  let head: ListNode | null = null;

  // This is a node in resulting list that we're gonna create on each step.
  let node: ListNode | null = null;

  // This is +1 that we should carry on to the next register in case of overflow.
  let extra = 0;

  // A helper function to create a new node in resulting list.
  const addNode = (val: number) => {
    const prev = node;
    node = new ListNode(val);

    // Link previous node with current one.
    if (prev) {
      prev.next = node;
    }

    // Remember the head if it wasn't created before.
    if (!head) {
      head = node;
    }
  };

  // Iterate both lists until at list one of them is not finished.
  while (p1 || p2) {
    // Get values at current register.
    let val1 = p1?.val || 0;
    let val2 = p2?.val || 0;

    // Add them including possible extra 1 from previous register.
    let val = val1 + val2 + extra;
    // Adjust the value and extra in case of register overflow.
    if (val >= 10) {
      val = val - 10;
      extra = 1;
    } else {
      extra = 0;
    }

    // Add new node to the resulting list.
    addNode(val);

    // Move both pointers to the next register.
    if (p1) {
      p1 = p1.next;
    }

    if (p2) {
      p2 = p2.next;
    }
  }

  // Add final node if there is an extra 1 pending from previous step.
  if (node && extra) {
    addNode(extra);
  }

  return head;
}
