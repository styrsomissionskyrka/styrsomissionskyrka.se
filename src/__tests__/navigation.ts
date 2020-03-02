import { Navigation, formatUrl, formatPaginatedUrl } from '../navigation';

describe('Navigation.fromTypename', () => {
  it('returns correct path based on typename', () => {
    expect(Navigation.fromTypename('ContentfulEvent')).toBe(Navigation.EVENT);
    expect(Navigation.fromTypename('ContentfulRetreat')).toBe(
      Navigation.RETREAT,
    );
    expect(Navigation.fromTypename('ContentfulPage')).toBe(Navigation.PAGE);
  });
});

describe('formatUrl', () => {
  it('formats url correctly', () => {
    expect(formatUrl('/path/:slug', { slug: 'foo' })).toBe('/path/foo');
    expect(formatUrl('/path/:slug', {})).toBe('/path/');
    expect(formatUrl('/path', { slug: 'foo' })).toBe('/path');
  });
});

describe('formatPaginatedUrl', () => {
  it('appends page suffix to base path when needed', () => {
    expect(formatPaginatedUrl('/events', 2, '/page/:page')).toBe(
      '/events/page/2',
    );
    expect(formatPaginatedUrl('/events', 1, '/page/:page')).toBe('/events');

    expect(formatPaginatedUrl('/events', 2)).toBe(
      '/events' + formatUrl(Navigation.PAGINATED, { page: 2 }),
    );
  });
});
