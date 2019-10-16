import React from 'react';
import { graphql, Link } from 'gatsby';
import { IndexQuery } from '../gatsby-queries';

interface Props {
  data: IndexQuery;
}

const IndexPage = ({ data }: Props) => {
  const { site, allContentfulEvent } = data;
  return (
    <div>
      <h1>{site && site.siteMetadata && site.siteMetadata.title}</h1>
      <ul>
        {allContentfulEvent.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={`retreat/${node.slug}`}>
              {node.title} - {node.startDate}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($today: Float) {
    site {
      siteMetadata {
        title
      }
    }

    allContentfulEvent(
      sort: { fields: startDate, order: DESC }
      filter: { startDateTimestamp: { gt: $today } }
    ) {
      edges {
        node {
          id
          title
          slug
          startDate
        }
      }
    }
  }
`;
