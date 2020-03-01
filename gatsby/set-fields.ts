import {
  SetFieldsOnGraphQLNodeTypeArgs,
  CreateSchemaCustomizationArgs,
  GatsbyNode,
} from 'gatsby';
import { GraphQLBoolean } from 'gatsby/graphql';
import { parseISO, format } from 'date-fns';
import { Navigation, formatUrl } from '../src/navigation';

/**
 * Add special fields to selected types in the graph schema
 */
export const setFieldsOnGraphQLNodeType: GatsbyNode['setFieldsOnGraphQLNodeType'] = async ({
  type,
}: SetFieldsOnGraphQLNodeTypeArgs) => {
  const types: Record<
    string,
    { type: any; resolve: (source: any) => any }
  > = {};

  if (type.name === 'ContentfulEvent' || type.name === 'ContentfulRetreat') {
    types.isFuture = {
      type: GraphQLBoolean,
      resolve: (source: any) => {
        return new Date(source.startDate).getTime() > Date.now();
      },
    };
  }

  if (
    type.name === 'ContentfulEvent' ||
    type.name === 'ContentfulRetreat' ||
    type.name === 'ContentfulPage'
  ) {
    types.pathParams = {
      type: 'PathParams!',
      resolve: (source: any) => {
        const pathParams = {
          slug: source.slug === '/' ? '' : source.slug,
          year: null,
          month: null,
          date: null,
        };

        if (source.startDate) {
          const date = parseISO(source.startDate);
          pathParams.year = format(date, 'yyyy');
          pathParams.month = format(date, 'MM');
          pathParams.date = format(date, 'dd');
        }

        return pathParams;
      },
    };

    types.formattedSlug = {
      type: 'String!',
      resolve: source => {
        const path = Navigation.fromTypename(type.name as any);
        const params = types.pathParams.resolve(source);

        return formatUrl(path, params);
      },
    };
  }

  return types;
};

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const typeDefs = /* GraphQL */ `
    type PathParams {
      slug: String!
      year: String
      month: String
      date: String
    }
  `;

  actions.createTypes(typeDefs);
};
