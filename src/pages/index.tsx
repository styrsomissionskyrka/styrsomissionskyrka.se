import React from 'react';
import { graphql, Link, PageComponentProps } from 'gatsby';
import { IndexQuery } from './__generated__/IndexQuery';

const IndexPage: React.FC<PageComponentProps<IndexQuery>> = ({ data }) => {
  const { events } = data;

  return (
    <div>
      <ul>
        {events.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.formattedSlug}>
              {node.title} | {node.startDate}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    page: contentfulPage(slug: { eq: "/" }) {
      content {
        json
      }
    }

    events: allContentfulEvent(
      limit: 5
      sort: { fields: startDate, order: ASC }
      filter: { isFuture: { eq: true } }
    ) {
      edges {
        node {
          id
          title
          formattedSlug
          startDate
        }
      }
    }

    retreats: allContentfulRetreat(
      sort: { fields: startDate, order: ASC }
      filter: { isFuture: { eq: true } }
    ) {
      edges {
        node {
          id
          title
          formattedSlug
          startDate
        }
      }
    }
  }
`;
