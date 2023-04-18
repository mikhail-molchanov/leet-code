/**
 * Problem description:
 * https://leetcode.com/problems/merge-two-sorted-lists/
 */

import { ListNode } from '../../shared/utils';

/**
 * Algorithm (iterative):
 * - Maintain cursors to both lists, head and tail of merged list.
 * - On each iteration select cursor with smallest value and append it to the tail, shift the cursor.
 * - Once end of any list is reached the rest of other list can be appended to the result.
 *
 * There is also a recursive alternative (not mine):
 * - Find smallest of cursors, add node to the head of merged lists, shift cursor.
 * - Recursive repeat itself over two remaining lists.
 */
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // Head of merged list.
  let head: ListNode | null = null;
  // Tail of merged list.
  let tail: ListNode | null = null;

  // list1 and list2 are moving cursors for corresponding lists.
  while (true) {
    // Smallest of the two cursors.
    let next: ListNode | undefined = undefined;

    // This block doesn't look good to me, but it does the job =)
    // TODO: This will not scale well when we have more than 2 input lists.
    if (list1 && list2) {
      // Both cursors are valid => find the one with smallest value and shift it.
      if (list1.val <= list2.val) {
        next = list1;
        list1 = list1.next;
      } else {
        next = list2;
        list2 = list2.next;
      }
    }
    // list2 is over, add list1 at current cursor to the merged list.
    else if (list1) {
      next = list1;
      list1 = null;
    }
    // list1 is over, add list2 at current cursor to the merged list.
    else if (list2) {
      next = list2;
      list2 = null;
    }
    // Both cursors have reached the end => end of iterations.
    else {
      return head;
    }

    // Add smallest node to the tail of merged list.
    if (tail) {
      tail.next = next;
    }
    // Now tail yet - set head of merged list.
    else {
      head = next;
    }

    tail = next;
  }
}
