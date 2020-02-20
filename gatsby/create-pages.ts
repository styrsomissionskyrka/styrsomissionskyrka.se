import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { CreatePagesArgs } from 'gatsby';

const access = promisify(fs.access);

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
  const { createPage } = actions;
  const { data, errors } = await graphql(/* GraphQL */ `
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
  `);

  if (errors) throw errors;

  for (let event of data.events.edges) {
    const { node } = event;
    createPage({
      path: `/kalender/${node.slug}`,
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
    createPage({
      path: `/retreat/${node.slug}`,
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
    createPage({
      path: `/${node.slug}`,
      component: await resolveTemplate([`page-${node.slug}.tsx`, 'page.tsx']),
      context: {
        id: node.id,
      },
    });
  }
}

/**
 * Resolve the first available template path
 */
async function resolveTemplate(templates: string[]): Promise<string> {
  for (let file of templates) {
    const filePath = path.resolve(__dirname, '../src/templates', file);
    if (await exists(filePath)) return filePath;
  }

  throw new Error(
    `Could not locate any of the following templates: ${templates.join(' ,')}`,
  );
}

/**
 * Check if a file exists on disk by determining if it's readable, or an optiona
 * other mode
 */
async function exists(
  file: string,
  mode: number = fs.constants.R_OK,
): Promise<boolean> {
  try {
    await access(file, mode);
    return true;
  } catch (err) {
    return false;
  }
}
