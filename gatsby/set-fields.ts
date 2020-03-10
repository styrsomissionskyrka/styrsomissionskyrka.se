import { SetFieldsOnGraphQLNodeTypeArgs, GatsbyNode } from 'gatsby';
import {
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLBoolean,
  GraphQLFieldConfigMap,
  GraphQLString,
} from 'gatsby/graphql';
import { isAfter, format } from 'date-fns';
import { Navigation, formatUrl } from '../src/navigation';

/**
 * Add special fields to selected types in the graph schema
 */
export const setFieldsOnGraphQLNodeType: GatsbyNode['setFieldsOnGraphQLNodeType'] = async ({
  type,
}: SetFieldsOnGraphQLNodeTypeArgs): Promise<GraphQLFieldConfigMap<
  PartialContenfulItem,
  any,
  any
>> => {
  const types: GraphQLFieldConfigMap<PartialContenfulItem, any, any> = {};

  if (
    type.name === 'ContentfulEvent' ||
    type.name === 'ContentfulRetreat' ||
    type.name === 'ContentfulPage'
  ) {
    types.isFuture = IsFuture;
    types.formattedSlug = FormattedSlug;
  }

  return types;
};

const IsFuture: GraphQLFieldConfig<PartialContenfulItem, any, any> = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description:
    'A field describing if the current item has a start date in the future',
  resolve: (source): boolean => {
    if (!source.startDate) return false;

    const today = new Date();
    const startDate = new Date(source.startDate);
    return isAfter(startDate, today);
  },
};

const FormattedSlug: GraphQLFieldConfig<PartialContenfulItem, any, any> = {
  type: new GraphQLNonNull(GraphQLString),
  description:
    'A formatted slug for the given page including things like year, month and date',
  resolve: (source): string => {
    if (!source.internal?.type) {
      throw new Error(
        'Trying to get a formatted slug from a node without proper internal type',
      );
    }

    const basePath = Navigation.fromTypename(source.internal.type);
    const params = source.startDate
      ? resolvePathParams(source.startDate)
      : null;

    return formatUrl(basePath, { ...params, slug: source.slug });
  },
};

const resolvePathParams = (startDate: string): PathParamsType => {
  const date = new Date(startDate);
  return {
    year: format(date, 'yyyy'),
    month: format(date, 'MM'),
    date: format(date, 'dd'),
  };
};

interface PartialContenfulItem {
  slug: string;
  startDate?: string;
  internal?: {
    type?: 'ContentfulEvent' | 'ContentfulRetreat' | 'ContentfulPage';
  };
}

interface PathParamsType {
  year?: string;
  month?: string;
  date?: string;
}
