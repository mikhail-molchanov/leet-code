/**
 * Problem description:
 * https://leetcode.com/problems/memoize/
 */

type Fn = (...params: any) => any;

// The only problem here is how to build params hash to make it fast and memory efficient.
function memoize(fn: Fn): Fn {
  // Map between input args hash and function values.
  const cache = new Map<string, any>();

  return function (...args) {
    const hash = JSON.stringify(args);
    if (cache.has(hash)) {
      return cache.get(hash);
    }

    const value = fn.apply(null, args); // or fn(...args)
    cache.set(hash, value);
    return value;
  };
}
