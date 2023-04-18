import { ListNode } from '../../shared/utils';

// Simple caching.
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
