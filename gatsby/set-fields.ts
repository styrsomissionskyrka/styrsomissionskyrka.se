import { SetFieldsOnGraphQLNodeTypeArgs } from 'gatsby';
import { GraphQLFloat, GraphQLBoolean } from 'gatsby/graphql';

/**
 * Add special fields to selected types in the graph schema
 */
export const setFieldsOnGraphQLNodeType = ({
  type,
}: SetFieldsOnGraphQLNodeTypeArgs) => {
  /**
   * By default the contentful plugin doesn't treat date fields as anything
   * other than strings. But sometimes we want to query based on the dates and
   * will use a timestamp to make that possible.
   */
  if (type.name === 'ContentfulEvent' || type.name === 'ContentfulRetreat') {
    return {
      startDateTimestamp: {
        type: GraphQLFloat,
        resolve: (source: any) => {
          return new Date(source.startDate).getTime();
        },
      },
      endDateTimestamp: {
        type: GraphQLFloat,
        resolve: (source: any) => {
          return new Date(source.endDate).getTime();
        },
      },
      isFuture: {
        type: GraphQLBoolean,
        resolve: (source: any) => {
          return new Date(source.startDate).getTime() > Date.now();
        },
      },
    };
  }

  return {};
};
