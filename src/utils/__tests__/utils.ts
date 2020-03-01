import { range, isNotNull } from '../';

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
    expect(range(1, 1)).toEqual([]);
    expect(range(5, 0)).toEqual([]);
  });
});
