import { insertParams } from '@reach/router/lib/utils';

type Typename = 'ContentfulPage' | 'ContentfulEvent' | 'ContentfulRetreat';

export class Navigation {
  static HOME = '/';

  static PAGE = '/:slug';

  static EVENTS = '/kalender';
  static EVENT = `${Navigation.EVENTS}/:slug`;

  static RETREATS = '/retreater';
  static RETREAT = `${Navigation.RETREATS}/:slug`;

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
  params: Record<string, string>,
): string => {
  return insertParams(path, params);
};
