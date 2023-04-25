/**
 * Problem description:
 * https://leetcode.com/problems/isomorphic-strings/
 */

// There must be a more simple algorithms but here is the first intuition.
// Convert each string into numeric representation as follows:
//
// paper => 1, 2, 1, 3, 4
// title => 1, 2, 1, 3, 4
//
// - Take a character
// - If it was found before, replace with the numeric representation
// - If it wasn't found before, replace it with current index (indexing starts from 1) and remember this index for future replacements.
//
// I can't really explain it but it feels like isomorphic strings should be converted to the same numeric representation.

// Just for fun let's use generators =)
function* process(s: string) {
  const map = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    let num = map.get(c);

    if (!num) {
      num = i + 1;
      map.set(c, num);
    }

    yield num;
  }
}

// Now we just have to create two iterators for each string and compare yielded values one by one.
export function isIsomorphic(s: string, t: string): boolean {
  const iterS = process(s);
  const iterT = process(t);

  let nextS = iterS.next();
  let nextT = iterT.next();

  while (!nextS.done && !nextT.done) {
    if (nextS.value !== nextT.value) {
      return false;
    }

    nextS = iterS.next();
    nextT = iterT.next();
  }

  return true;
}
