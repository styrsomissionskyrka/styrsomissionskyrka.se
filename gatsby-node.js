const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { GraphQLFloat } = require('gatsby/graphql');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data, errors } = await graphql(
    /* GraphQL */ `
      query PagesQuery($today: Float) {
        allContentfulEvent(filter: { startDateTimestamp: { gte: $today } }) {
          edges {
            node {
              id
              slug
            }
          }
        }

        allContentfulRetreat(filter: { startDateTimestamp: { gte: $today } }) {
          edges {
            node {
              id
              slug
            }
          }
        }

        allContentfulPage(filter: { slug: { ne: "start" } }) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `,
    { today: Date.now() },
  );

  if (errors) throw errors;

  for (let event of data.allContentfulEvent.edges) {
    const { node } = event;
    createPage({
      path: `/kalender/${node.slug}`,
      component: await resolveTemplate([
        `./src/templates/single-event-${node.slug}.tsx`,
        './src/templates/single-event.tsx',
      ]),
      context: {
        id: node.id,
      },
    });
  }

  for (let retreat of data.allContentfulRetreat.edges) {
    const { node } = retreat;
    createPage({
      path: `/retreat/${node.slug}`,
      component: await resolveTemplate([
        `./src/templates/single-retreat-${node.slug}.tsx`,
        './src/templates/single-retreat.tsx',
      ]),
      context: {
        id: node.id,
      },
    });
  }

  for (let page of data.allContentfulPage.edges) {
    const { node } = page;
    createPage({
      path: `/${node.slug}`,
      component: await resolveTemplate([
        `./src/templates/page-${node.slug}.tsx`,
        './src/templates/page.tsx',
      ]),
      context: {
        id: node.id,
      },
    });
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  /**
   * By default the contentful plugin doesn't treat date fields as anything
   * other than strings. But sometimes we want to query based on the dates and
   * will use a timestamp to make that possible.
   */
  if (type.name === 'ContentfulEvent' || type.name === 'ContentfulRetreat') {
    return {
      startDateTimestamp: {
        type: GraphQLFloat,
        resolve: source => new Date(source.startDate).getTime(),
      },
      endDateTimestamp: {
        type: GraphQLFloat,
        resolve: source => new Date(source.endDate).getTime(),
      },
    };
  }

  return {};
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  /**
   * This will add a $today param to all queries created statically (meaning
   * all queries made in files inside `src/pages`).
   */
  if (page.isCreatedByStatefulCreatePages) {
    const today = Date.now();
    deletePage(page);
    createPage({
      ...page,
      context: { today, ...page.context },
    });
  }
};

/**
 * Resolve the first available template path
 *
 * @param {string[]} templates Array of template paths
 * @return {string} Returns the first available template fill path
 */
async function resolveTemplate(templates) {
  for (let file of templates) {
    const filePath = path.resolve(__dirname, file);
    if (await exists(filePath)) return filePath;
  }

  throw new Error(
    `Could not locate any of the following templates: ${templates.join(' ,')}`,
  );
}

const access = promisify(fs.access);
async function exists(file) {
  try {
    await access(file, fs.constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}
