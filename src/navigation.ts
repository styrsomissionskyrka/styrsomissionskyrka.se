import { insertParams } from '@reach/router/lib/utils';

type Typename = 'ContentfulPage' | 'ContentfulEvent' | 'ContentfulRetreat';

export class Navigation {
  static HOME = '/';
  static PAGINATED = '/sida/:page';

  static PAGE = '/:slug';

  static EVENTS = '/kalender';
  static EVENT = `${Navigation.EVENTS}/:year/:month/:date/:slug`;

  static RETREATS = '/retreater';
  static RETREAT = `${Navigation.RETREATS}/:year/:month/:slug`;

  static fromTypename(typename: Typename): string {
    switch (typename) {
      case 'ContentfulPage':
        return Navigation.PAGE;
      case 'ContentfulEvent':
        return Navigation.EVENT;
      case 'ContentfulRetreat':
        return Navigation.RETREAT;
    }
  }
}

export const formatUrl = (
  path: string,
  params: Record<string, string | number | null | undefined>,
): string => {
  return insertParams(path, params);
};

export const formatPaginatedUrl = (base: string, page: number) => {
  if (page > 1) {
    return formatUrl(removeTrailingSlash(base) + Navigation.PAGINATED, {
      page,
    });
  }

  return base;
};

export const removeLeadingSlash = (path: string) => path.replace(/^\//, '');
export const removeTrailingSlash = (path: string) => path.replace(/\/$/, '');
export const removeSlashes = (path: string) => {
  return removeLeadingSlash(removeTrailingSlash(path));
};
