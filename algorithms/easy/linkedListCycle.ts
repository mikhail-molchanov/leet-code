import { ListNode } from '../../shared/utils';

// Simple caching.
// P.S. Look up constant memory approach (fast and slow pointers), it's really cool.
export function hasCycle(head: ListNode | null): boolean {
  const nodes = new Set<ListNode>();

  let node = head;

  while (node) {
    if (nodes.has(node)) {
      return true;
    }

    nodes.add(node);
    node = node.next;
  }

  return false;
}
