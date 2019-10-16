const { GraphQLInt } = require('gatsby/graphql');

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === 'ContentfulEvent' || type.name === 'ContentfulRetreat') {
    return {
      startDateTimestamp: {
        type: GraphQLInt,
        resolve: source => new Date(source.startDate).getTime(),
      },
      endDateTimestamp: {
        type: GraphQLInt,
        resolve: source => new Date(source.endDate).getTime(),
      },
    };
  }

  return {};
};
