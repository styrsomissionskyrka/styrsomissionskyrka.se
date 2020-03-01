/**
 * Validate that an item is not null (or undefined). Useful to keep type safety
 * inside Array filter.
 *
 * @example
 * const arr: Array<string | null> = [];
 * arr.filter(isNotNull); // Array<string>
 *
 * @param item Any non null item
 */
export const isNotNull = <T>(item: T | null): item is T => item != null;

export const range = (from: number, to: number): number[] => {
  const length = to - from;
  if (length < 1) return [];

  const arr = Array.from({ length }, (_, i) => from + i);
  return arr;
};
