import { isIsomorphic } from './isomorphicStrings';

describe('Isomorphic Strings', () => {
  test.each([
    ['egg', 'add', true],
    ['foo', 'bar', false],
    ['paper', 'title', true],
    ['pap', 'ppp', false],
  ])('strings %p and %p are isomorphic: %p', (s1, s2, result) => {
    expect(isIsomorphic(s1, s2)).toEqual(result);
  });
});
