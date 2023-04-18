export class ListNode {
  constructor(public val = 0, public next: ListNode | null = null) {}
}
export class TreeNode {
  constructor(
    public val: number = 0,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

// Traverse the tree in level-based order (level by level).
export const treeToArray = (tree: TreeNode | null): number[] => {
  const result: number[] = [];
  let level = 1;

  // Serialize the tree level by level (each time we need to go from the root to specified level,
  // so it's not very efficient).
  // Some algorithms do tree depth calculation first and then use "for" loop.
  // However it can be done along with serializing the tree:
  // if at some level there were no elements added to the resulting array then we can stop.
  while (treeLevelToArray(tree, result, level)) {
    level++;
  }

  return result;
};

const treeLevelToArray = (tree: TreeNode | null, result: number[], level: number): boolean => {
  if (!tree) {
    return false;
  }

  // We've reached the specified level - add the value to array and go up.
  if (level === 1) {
    result.push(tree.val);
    return true;
  }

  // Traverse left and right parts recursively until specified level is reached.
  const left = treeLevelToArray(tree.left, result, level - 1);
  const right = treeLevelToArray(tree.right, result, level - 1);

  // If none of the sub-trees could be traversed down to the specified level
  // it means that maximum depth of the tree is reached.
  // Master algorithm will use this as an indication that the job is done.
  return left || right;
};

// Read the tree from it's level-serialized array representation.
export const treeFromArray = (array: (number | null)[]): TreeNode | null => {
  // Root node of resulting tree.
  let result: TreeNode | null = null;

  // We're gonna use "array" as input queue where we get elements from the top one by one.
  // The "array" itself is gonna be modified in the process so we'll need a copy of it.
  const input = [...array];

  // Whenever new value is read from the input we will create a new node.
  // The "left" and "right" parts of it will not be read immediately (cause they belong to the next level)
  // Instead the node will be added to the end of the queue that will be processed on the next cycle.
  const queue: TreeNode[] = [];

  while (input.length) {
    if (!result) {
      // Create root node.
      const value = input.shift();
      if (value) {
        result = new TreeNode(value);
        queue.push(result);
      } else {
        return result;
      }
    } else {
      const node = queue.shift();

      if (node) {
        const left = input.shift();
        if (left) {
          node.left = new TreeNode(left);
          queue.push(node.left);
        }

        const right = input.shift();
        if (right) {
          node.right = new TreeNode(right);
          queue.push(node.right);
        }
      }
    }
  }

  return result;
};

export type NonEmptyArray<T> = [T, ...T[]];

// Helper functions to be able to write linked list tests in array notation.
export const linkedListFromArray = (array: number[], cycleTo = -1): ListNode | null => {
  if (!array.length) {
    return null;
  }

  let head: ListNode | null = null;
  let node: ListNode | null = null;

  let cycledNode: ListNode | null = null;

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    const prev = node;
    node = new ListNode(value);

    if (prev) {
      prev.next = node;
    } else {
      head = node;
    }

    if (cycleTo >= 0 && i === cycleTo) {
      cycledNode = node;
    }
  }

  // Make a cycle from tail to element at specified position if needed.
  if (cycledNode && node) {
    node.next = cycledNode;
  }

  return head;
};

export const linkedListToArray = (list: ListNode | null) => {
  const result: number[] = [];

  while (list) {
    result.push(list.val);
    list = list.next;
  }

  return result;
};
