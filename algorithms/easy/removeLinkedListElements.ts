/**
 * Problem description:
 * https://leetcode.com/problems/remove-linked-list-elements/
 */

import { ListNode } from '../../shared/utils';

export function removeElements(head: ListNode | null, val: number): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;

  while (current) {
    // Current element has to be removed.
    if (current.val === val) {
      current = current.next;

      // If there is a previous element then it has to be linked to the one next to current one.
      if (prev) {
        prev.next = current;
      }
      // If there is no previous element it means that we're at the head of the list.
      // So to remove the head element we just need to move the pointer to the next element.
      else {
        head = current;
      }
    } else {
      // In case current element doesn't match the criteria we just have to move to the next element
      // remembering the previous one.
      prev = current;
      current = current.next;
    }
  }

  return head;
}
