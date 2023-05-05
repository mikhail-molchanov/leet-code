/**
 * Problem description:
 * https://leetcode.com/problems/group-anagrams/
 */

// How does it even come close to "medium" complexity? =)
export function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (let str of strs) {
    // Normalize "str" by sorting it.
    // This is the most time expensive operation.
    const normalized = [...str].sort().join('');
    const entry = map.get(normalized);
    if (entry) {
      map.set(normalized, [...entry, str]);
    } else {
      map.set(normalized, [str]);
    }
  }

  return Array.from(map.values());
}
