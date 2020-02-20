import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);

/**
 * Part of gatsbys node api this function will fetch data from the GraphAPI and
 * generate pages based on the returned content.
 *
 * @param {import('gatsby').CreatePagesArgs} args
 * @param {import('gatsby').PluginOptions} [options]
 * @param {import('gatsby').PluginCallback} [callback]
 * @return {Promise<void>}
 */
export const createPages = async ({ graphql, actions }) => {
  await createSinglePages({ graphql, actions });
};

/**
 * Create single pages based on data fetched from GraphAPI
 *
 * @param {import('gatsby').CreatePagesArgs} args
 * @return {Promise<void>}
 */
async function createSinglePages({ graphql, actions }) {
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
 *
 * @param {string[]} templates Array of template paths
 * @return {string} Returns the first available template fill path
 */
async function resolveTemplate(templates) {
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
 *
 * @param {import('fs').PathLike} file Path to file, absolute or relative doesn't matter
 * @param {number} [mode=fs.constants.R_OK] Access mode, use one of the available from fs.constants
 * @returns {Promise<boolean>}
 */
async function exists(file, mode = fs.constants.R_OK) {
  try {
    await access(file, mode);
    return true;
  } catch (err) {
    return false;
  }
}
