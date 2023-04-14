import { lengthOfLastWord } from './lengthOfLastWord';

describe('Length Of Last Word', () => {
  test.each([
    ['', 0],
    ['    ', 0],
    ['a', 1],
    ['aa ', 2],
    ['   aa ', 2],
    ['   aa bbb', 3],
    ['c   aa ?b+  ', 3],
  ])('length of last word in "%p" is %p', (input, result) => {
    expect(lengthOfLastWord(input)).toEqual(result);
  });
});
