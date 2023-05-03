import { countAndSay } from './countAndSay';

describe('Count and Say', () => {
  test.each([
    [1, '1'],
    [2, '11'],
    [3, '21'],
    [4, '1211'],
    [5, '111221'],
    [10, '13211311123113112211'],
  ])('count and say algorithm output for step %p: %p', (step, output) => {
    expect(countAndSay(step)).toEqual(output);
  });
});
