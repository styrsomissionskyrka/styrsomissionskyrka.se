import React from 'react';
import { Link, graphql, PageComponentProps } from 'gatsby';
import { Pagination } from '../components/Pagination';
import { Navigation } from '../navigation';
import { RetreatsArchiveQuery } from './__generated__/RetreatsArchiveQuery';

const RetreatsArchive: React.FC<PageComponentProps<RetreatsArchiveQuery>> = ({
  data,
}) => {
  const { pageInfo, edges: retreats } = data.allContentfulRetreat;

  return (
    <div>
      <h2>Retreats</h2>
      {retreats.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.formattedSlug}>{node.title}</Link>
        </li>
      ))}
      <Pagination pageInfo={pageInfo} pathBase={Navigation.EVENTS} />
    </div>
  );
};

export default RetreatsArchive;

export const query = graphql`
  query RetreatsArchiveQuery($limit: Int!, $skip: Int!, $slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
    }

    allContentfulRetreat(
      limit: $limit
      skip: $skip
      filter: { isFuture: { eq: true } }
      sort: { fields: startDate, order: ASC }
    ) {
      edges {
        node {
          id
          title
          formattedSlug
        }
      }
      pageInfo {
        ...PaginationInfo
      }
    }
  }
`;
