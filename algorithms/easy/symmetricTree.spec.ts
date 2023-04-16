import { treeFromArray } from '../../shared/utils';

import { isSymmetric } from './symmetricTree';

describe('Symmetric Tree', () => {
  test.each([
    [[1, 2, 2, 3, 4, 4, 3], true],
    [[1, 2, 2, null, 3, null, 3], false],
  ])('tree is symmetric %p: %p', (treeArray, result) => {
    expect(isSymmetric(treeFromArray(treeArray))).toEqual(result);
  });
});
