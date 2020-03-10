import { CreatePagesArgs, GatsbyNode } from 'gatsby';
import { resolveTemplate } from './utils';
import { Navigation, formatPaginatedUrl } from '../src/navigation';
import { range, removeLeadingSlash } from '../src/utils';
import {
  PAGES_QUERY,
  ARCHIVES_QUERY,
  PagesQuery,
  ArchivesQuery,
  ArchivesQueryVariables,
} from './graphql/queries';

/**
 * Part of gatsbys node api this function will fetch data from the GraphAPI and
 * generate pages based on the returned content.
 */
export const createPages: GatsbyNode['createPages'] = async args => {
  await createSinglePages(args);
  await createArchivePages(args);
};

/**
 * Create single pages based on data fetched from GraphAPI
 */
async function createSinglePages({ graphql, actions }: CreatePagesArgs) {
  const { data, errors } = await graphql<PagesQuery>(PAGES_QUERY);
  if (errors) throw errors;
  if (!data) throw new Error('No data found');

  for (let event of data.events.edges) {
    const { node } = event;
    actions.createPage({
      path: node.formattedSlug,
      component: await resolveTemplate([
        `single-event-${node.slug}.tsx`,
        'single-event.tsx',
      ]),
      context: {
        id: node.id,
      },
    });
  }

  for (let retreat of data.retreats.edges) {
    const { node } = retreat;
    actions.createPage({
      path: node.formattedSlug,
      component: await resolveTemplate([
        `single-retreat-${node.slug}.tsx`,
        'single-retreat.tsx',
      ]),
      context: {
        id: node.id,
      },
    });
  }

  for (let page of data.pages.edges) {
    const { node } = page;
    if (!node.slug || Navigation.isForbidden(node.slug)) continue;

    actions.createPage({
      path: node.formattedSlug,
      component: await resolveTemplate([`page-${node.slug}.tsx`, 'page.tsx']),
      context: {
        id: node.id,
      },
    });
  }
}

async function createArchivePages({ graphql, actions }: CreatePagesArgs) {
  const ITEMS_PER_PAGE = 10;
  const { data, errors } = await graphql<ArchivesQuery, ArchivesQueryVariables>(
    ARCHIVES_QUERY,
    { limit: ITEMS_PER_PAGE },
  );

  if (errors) throw errors;
  if (!data) throw new Error('No data found');

  const createPaginatedArchive = ({
    pathBase,
    totalCount,
    component,
    context,
  }: {
    pathBase: string;
    totalCount: number;
    component: string;
    context?: Record<string, any>;
  }) => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const pages = range(0, totalPages);

    for (let page of pages) {
      actions.createPage({
        path: formatPaginatedUrl(pathBase, page + 1),
        component,
        context: {
          ...context,
          limit: ITEMS_PER_PAGE,
          skip: ITEMS_PER_PAGE * page,
        },
      });
    }
  };

  const { events, retreats } = data;

  createPaginatedArchive({
    pathBase: Navigation.EVENTS,
    totalCount: events.totalCount,
    component: await resolveTemplate(['archive-events.tsx']),
    context: {
      slug: removeLeadingSlash(Navigation.EVENTS),
    },
  });

  createPaginatedArchive({
    pathBase: Navigation.RETREATS,
    totalCount: retreats.totalCount,
    component: await resolveTemplate(['archive-retreats.tsx']),
    context: {
      slug: removeLeadingSlash(Navigation.RETREATS),
    },
  });
}
