import { insertParams } from '@reach/router/lib/utils';

export class Navigation {
  static HOME = '/';

  static PAGE = '/:slug';

  static EVENTS = '/kalender';
  static EVENT = `${Navigation.EVENTS}/:slug`;

  static RETREATS = '/retreater';
  static RETREAT = `${Navigation.RETREATS}/:slug`;
}

export const formatUrl = (
  path: string,
  params: Record<string, string>,
): string => {
  return insertParams(path, params);
};
