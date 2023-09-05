import { trap, trap2 } from './trappingRainWater';

describe('Trapping Rain Water', () => {
  test.each([
    [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6],
    [[4, 2, 0, 3, 2, 5], 9],
    // This is where version 1 will stuck while version 2 will not loose any performance.
    [[0, 50000, 0, 100000, 0], 50000],
  ])('amount of water that can be trapped for %p: %p', (input, result) => {
    // expect(trap(input)).toEqual(result);
    expect(trap2(input)).toEqual(result);
  });
});
