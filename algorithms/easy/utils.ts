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

  // We reached the specified level - add the value to array and go up.
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
  let result: TreeNode | null = null;

  const queue: TreeNode[] = [];
  const input = [...array];

  while (input.length) {
    if (!result) {
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
