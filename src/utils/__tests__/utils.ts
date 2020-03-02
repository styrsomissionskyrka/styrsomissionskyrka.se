import {
  range,
  isNotNull,
  removeLeadingSlash,
  removeTrailingSlash,
  removeSlashes,
} from '../';

describe('utils: isNotNull', () => {
  it('checks if given argument is not null or undefined', () => {
    expect(isNotNull('Hello')).toBeTruthy();
    expect(isNotNull(1)).toBeTruthy();
    expect(isNotNull(0)).toBeTruthy();
    expect(isNotNull({})).toBeTruthy();
    expect(isNotNull('')).toBeTruthy();

    expect(isNotNull(null)).toBeFalsy();
    expect(isNotNull(undefined)).toBeFalsy();
  });
});

describe('utils: range', () => {
  it('creates a range of number between `from` (inclusive) and `to` (exclusive)', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(-2, 3)).toEqual([-2, -1, 0, 1, 2]);
    expect(range(-5, -1)).toEqual([-5, -4, -3, -2]);
    expect(range(1, 1)).toEqual([]);
    expect(range(5, 0)).toEqual([]);
  });
});

describe('utils: removeLeadingSlash', () => {
  it('removes any leading slash from given string', () => {
    expect(removeLeadingSlash('/leading/slash/')).toBe('leading/slash/');
    expect(removeLeadingSlash('leading/slash/')).toBe('leading/slash/');
  });
});

describe('utils: removeTrailingSlash', () => {
  it('removes any trailing slash from given string', () => {
    expect(removeTrailingSlash('/trailing/slash/')).toBe('/trailing/slash');
    expect(removeTrailingSlash('/trailing/slash')).toBe('/trailing/slash');
  });
});

describe('utils: removeSlashes', () => {
  it('removes any leading and/or trailing slash from given string', () => {
    expect(removeSlashes('/double/slash/')).toBe('double/slash');
    expect(removeSlashes('double/slash')).toBe('double/slash');
  });
});
