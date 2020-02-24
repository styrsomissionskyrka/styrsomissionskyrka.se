import { CreatePagesArgs } from 'gatsby';
import { Navigation, formatUrl } from '../src/navigation';
import { resolveTemplate } from './utils';

/**
 * Part of gatsbys node api this function will fetch data from the GraphAPI and
 * generate pages based on the returned content.
 */
export const createPages = async (args: CreatePagesArgs) => {
  await createSinglePages(args);
};

/**
 * Create single pages based on data fetched from GraphAPI
 */
async function createSinglePages({ graphql, actions }: CreatePagesArgs) {
  const { data, errors } = await graphql<PagesQuery>(PAGES_QUERY);
  if (errors) throw errors;

  for (let event of data.events.edges) {
    const { node } = event;
    actions.createPage({
      path: formatUrl(Navigation.EVENT, { slug: node.slug }),
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
      path: formatUrl(Navigation.RETREAT, { slug: node.slug }),
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
    actions.createPage({
      path: formatUrl(Navigation.PAGE, { slug: node.slug }),
      component: await resolveTemplate([`page-${node.slug}.tsx`, 'page.tsx']),
      context: {
        id: node.id,
      },
    });
  }
}

/**
 * QUERIES and TYPES
 */
const PAGES_QUERY = /* GraphQL */ `
  query PagesQuery {
    events: allContentfulEvent(filter: { isFuture: { eq: true } }) {
      edges {
        node {
          id
          slug
        }
      }
    }

    retreats: allContentfulRetreat(filter: { isFuture: { eq: true } }) {
      edges {
        node {
          id
          slug
        }
      }
    }

    pages: allContentfulPage(filter: { slug: { ne: "start" } }) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`;

interface PagesQuery {
  events: { edges: Edge[] };
  retreats: { edges: Edge[] };
  pages: { edges: Edge[] };
}

interface Edge {
  node: {
    id: string;
    slug: string;
  };
}
