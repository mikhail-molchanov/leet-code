/**
 * Problem description:
 * https://leetcode.com/problems/reverse-linked-list/
 */

import { ListNode } from '../../shared/utils';

export function reverseList(head: ListNode | null): ListNode | null {
  // For simplification let's filter out simple cases like no head or single element.
  if (!head || !head.next) {
    return head;
  }

  // Set up initial pointer: prev and current elements.
  let prev = head;
  let node: ListNode | null = head.next;

  // Make sure to convert head to tail.
  head.next = null;

  while (node) {
    const next: ListNode | null = node.next;
    // Re-point to previous element;
    node.next = prev;
    // Move next and current element pointers.
    prev = node;
    node = next;
  }

  // By definition "node" will be "null" at this point and "prev" is a new head.
  return prev;
}

// Recursive version.
export function reverseList2(head: ListNode | null, prev?: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  const next = head.next;

  if (!prev) {
    head.next = null;
  }

  const reversed = reverseList2(next, head);
  next.next = head;
  return reversed;
}
