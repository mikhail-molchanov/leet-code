import { canJump, canJump2 } from './jumpGame';

describe('Jump Game', () => {
  test.each([
    [[1], true],
    [[1, 1], true],
    [[0, 1], false],
    [[2, 3, 1, 1, 4], true],
    [[3, 2, 1, 0, 4], false],
    [[10, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0], false],
    [[10, 0, 0, 0, 3, 0, 0, 5, 0, 0, 0, 0], true],
  ])('can reach end index of %p: %p', (array, result) => {
    expect(canJump(array)).toEqual(result);
    expect(canJump2(array)).toEqual(result);
  });
});
