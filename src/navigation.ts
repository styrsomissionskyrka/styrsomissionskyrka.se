import { insertParams } from '@reach/router/lib/utils';
import { removeLeadingSlash, removeTrailingSlash } from './utils';

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

  static isForbidden(slug: string) {
    for (let predefinedSlug of Object.values(Navigation)) {
      if (
        typeof predefinedSlug === 'string' &&
        removeLeadingSlash(predefinedSlug) === slug
      ) {
        return true;
      }
    }

    return false;
  }
}

export const formatUrl = (
  path: string,
  params: Record<string, string | number | null | undefined>,
): string => {
  return insertParams(path, params);
};

export const formatPaginatedUrl = (
  base: string,
  page: number,
  pageSuffix: string = Navigation.PAGINATED,
) => {
  if (page > 1) {
    return formatUrl(removeTrailingSlash(base) + pageSuffix, {
      page,
    });
  }

  return base;
};
