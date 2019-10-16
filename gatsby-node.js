const { GraphQLFloat } = require('gatsby/graphql');

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
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

  if (page.isCreatedByStatefulCreatePages) {
    const today = Date.now();
    deletePage(page);
    createPage({
      ...page,
      context: { today, ...page.context },
    });
  }
};
