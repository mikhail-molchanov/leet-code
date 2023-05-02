/**
 * Problem description:
 * https://leetcode.com/problems/combination-sum-ii/
 */

// Too slow for LeetCode =)
export function combinationSum2_1(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const hashes = new Set<string>();

  const addCombination = (combination: number[]) => {
    const hash = combination.sort().join(' ');
    console.log(hash);
    if (!hashes.has(hash)) {
      result.push(combination);
      hashes.add(hash);
    }
  };

  const iterate = (candidates: number[], target: number, combination: number[] = []) => {
    for (let index = 0; index < candidates.length; index++) {
      const candidate = candidates[index];
      if (candidate === target) {
        addCombination([...combination, candidate]);
      } else if (candidate < target) {
        const newCandidates = candidates.filter((value, i) => i > index);
        const newTarget = target - candidate;
        iterate(newCandidates, newTarget, [...combination, candidate]);
      }
    }
  };

  iterate(candidates, target);

  return result;
}

// Version 2 (improved):
// - Sort and create a map of values to number of available items.
export function combinationSum2_2(candidates: number[], target: number): number[][] {
  // Convert input array [10, 1, 2, 4, 1, 2, 7, 5] to sorted dictionary-like array [[1, 2], [2, 2], 4, 5, 7, 10].
  candidates.sort((a, b) => a - b);

  const map = new Map<number, number>();
  candidates.forEach(item => {
    const num = map.get(item) || 0;
    map.set(item, num + 1);
  });

  const list: number[][] = [];
  map.forEach((value, key) => {
    list.push([key, value]);
  });

  const result: number[][] = [];

  // This function will be called recursively.
  // "combination" is what we collected on previous step.
  const iterate = (list: number[][], target: number, combination: number[] = []) => {
    // For each item in the list.
    for (let index = 0; index < list.length; index++) {
      // Get first item and how much is available.
      const [candidate, num] = list[index];

      // If item equals target then combination is complete, we can add it to the result.
      if (candidate === target) {
        result.push([...combination, candidate]);
      }
      // If we can use current item (i.e. it is smaller than target) then
      // pick it, add to the current combination and repeat itself with reduced target abd list.
      else if (candidate < target) {
        let newList: number[][] = [];
        if (num > 1) {
          newList = list.slice(index);
          newList[0] = [candidate, num - 1];
        } else {
          newList = list.slice(index + 1);
        }

        const newTarget = target - candidate;
        iterate(newList, newTarget, [...combination, candidate]);
      }
      // candidate < target
      else {
        // Since array is sorted there is no point to continue.
        // Elements from the rest of the list will be bigger than target.
        break;
      }
    }
  };

  iterate(list, target);

  return result;
}
