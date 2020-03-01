import { graphql } from '../utils';

export * from './__generated__/PagesQuery';
export * from './__generated__/ArchivesQuery';

export const PAGES_QUERY = graphql`
  query PagesQuery {
    events: allContentfulEvent(limit: 100, filter: { isFuture: { eq: true } }) {
      edges {
        node {
          id
          slug
          formattedSlug
        }
      }
    }

    retreats: allContentfulRetreat(
      limit: 100
      filter: { isFuture: { eq: true } }
    ) {
      edges {
        node {
          id
          slug
          formattedSlug
        }
      }
    }

    pages: allContentfulPage(limit: 100, filter: { slug: { ne: "/" } }) {
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

export const ARCHIVES_QUERY = graphql`
  query ArchivesQuery($limit: Int!) {
    events: allContentfulEvent(
      limit: $limit
      filter: { isFuture: { eq: true } }
    ) {
      totalCount
    }

    retreats: allContentfulRetreat(
      limit: $limit
      filter: { isFuture: { eq: true } }
    ) {
      totalCount
    }
  }
`;
