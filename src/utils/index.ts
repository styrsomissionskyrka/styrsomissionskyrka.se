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

/**
 * Create an a array of number between from (inclusive) and to (exclusive). If
 * `from` is greater than, or equal to, `to` it will create an empty array.
 *
 * @example
 * range(1, 5); // [1, 2, 3, 4]
 * range(1, 1); // []
 *
 * @param from Starting number
 * @param to Ending number (not included)
 */
export const range = (from: number, to: number): number[] => {
  let result: number[] = [];
  let current = from;

  while (current < to) {
    result.push(current);
    current += 1;
  }

  return result;
};

/**
 * Remove any leading slash from a string. This function will not do anything if
 * the string doesn't start with a slash (`/`).
 *
 * @param path Path string, maybe with leading slash
 */
export const removeLeadingSlash = (path: string) => path.replace(/^\//, '');

/**
 * Remove any trailing skash from a string. This function will not do anything
 * if the string doesn't end with a slash (`/`).
 *
 * @param path Path string, maybe with trailing slash
 */
export const removeTrailingSlash = (path: string) => path.replace(/\/$/, '');

/**
 * Remove any trailing and/or leading slash from a string.
 *
 * @param path Path string, maybe with trailing and/or leading slash
 */
export const removeSlashes = (path: string) => {
  return removeLeadingSlash(removeTrailingSlash(path));
};
