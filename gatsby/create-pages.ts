import { CreatePagesArgs } from 'gatsby';
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
    actions.createPage({
      path: node.formattedSlug,
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
          formattedSlug
        }
      }
    }

    retreats: allContentfulRetreat(filter: { isFuture: { eq: true } }) {
      edges {
        node {
          id
          slug
          formattedSlug
        }
      }
    }

    pages: allContentfulPage(filter: { slug: { ne: "/" } }) {
      edges {
        node {
          id
          slug
          formattedSlug
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
    formattedSlug: string;
  };
}
