// Algorithm:
// - Start from second price
// - On every step calc minimum previous price
// - Then calc max profit based on current price and minimum previous price
// - Get max of max profits over all prices.
export function maxProfit(prices: number[]): number {
  let maxProfit = 0;

  // Since we don't need exact positions when to buy and when to sell
  // it's enough to just keep the minimum price for all previous steps.
  let minPrevPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    const prevPrice = prices[i - 1];

    // Adjust min price.
    if (prevPrice < minPrevPrice) {
      minPrevPrice = prevPrice;
    }

    const profit = prices[i] - minPrevPrice;

    // Adjust max profit.
    if (profit > maxProfit) {
      maxProfit = profit;
    }
  }

  return maxProfit;
}
