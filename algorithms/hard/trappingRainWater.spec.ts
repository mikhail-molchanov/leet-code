import { trap, trap2 } from './trappingRainWater';

describe('Trapping Rain Water', () => {
  test.each([
    [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], 6],
    [[4, 2, 0, 3, 2, 5], 9],
  ])('amount of water that can be trapped for %p: %p', (input, result) => {
    // expect(trap(input)).toEqual(result);
    expect(trap2(input)).toEqual(result);
  });
});
