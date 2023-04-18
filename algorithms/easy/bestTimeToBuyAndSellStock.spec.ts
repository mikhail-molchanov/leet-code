import { maxProfit } from './bestTimeToBuyAndSellStock';

describe('Best Time to Buy and Sell Stock', () => {
  test.each([
    [[7, 1, 5, 3, 6, 4], 5],
    [[7, 6, 4, 3, 1], 0],
  ])('max profit for prices %p: %p', (prices, result) => {
    expect(maxProfit(prices)).toEqual(result);
  });
});
