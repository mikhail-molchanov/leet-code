import { equalDeep } from '../../shared/utils';

import { groupAnagrams } from './groupAnagrams';

describe('Group Anagrams', () => {
  test.each([
    [[''], [['']]],
    [['a'], [['a']]],
    [
      ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
      [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']],
    ],
  ])('grouped anagrams for %p: %p', (input, output) => {
    const result = equalDeep(groupAnagrams(input), output);
    expect(result).toBeTruthy();
  });
});
