import { canConstruct } from './ransomNote';

describe('Ransom Note', () => {
  test.each([
    ['a', 'b', false],
    ['aa', 'ab', false],
    ['aa', 'aab', true],
    ['iwillkillyou', 'iiwllykioull', true],
    ['iwillkillyou', 'iiwllykioul', false],
  ])('ransom note %p can be constructed from %p magazine: %p', (note, magazine, result) => {
    expect(canConstruct(note, magazine)).toEqual(result);
  });
});
