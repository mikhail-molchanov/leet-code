export class TreeNode {
  constructor(
    public val: number = 0,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export const treeToArray = (tree: TreeNode | null): number[] => {
  const result: number[] = [];
  let level = 1;

  while (treeLevelToArray(tree, result, level)) {
    level++;
  }

  return result;
};

const treeLevelToArray = (tree: TreeNode | null, result: number[], level: number): boolean => {
  if (!tree) {
    return false;
  }

  if (level === 1) {
    result.push(tree.val);
    return true;
  }

  const left = treeLevelToArray(tree.left, result, level - 1);
  const right = treeLevelToArray(tree.right, result, level - 1);
  return left || right;
};

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
