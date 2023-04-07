import { twoSum } from './twoSum';

describe('twoSum', () => {
  test.each([
    [[], 5, []],
    [[3, 3], 5, []],
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
  ])('indexes of %p that will give %p as a sum are ', (input, target, output) => {
    expect(twoSum(input, target)).toEqual(output);
  });
});
