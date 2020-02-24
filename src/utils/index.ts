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
