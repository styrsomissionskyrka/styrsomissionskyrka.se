import React from 'react';
import { Link, graphql } from 'gatsby';

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allContentfulEvent: {
      edges: {
        node: {
          id: string;
          title: string;
          slug: string;
          startDate: string;
        };
      }[];
    };
  };
}

const IndexPage = ({ data }: Props) => {
  const { site, allContentfulEvent } = data;
  return (
    <div>
      <h1>Hello world – {site.siteMetadata.title}</h1>
      <Link to="/page-2">Go to page 2</Link>
      <ul>
        {allContentfulEvent.edges.map(({ node }) => (
          <li key={node.id}>
            {node.title} - {node.startDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($now: Int) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulEvent(
      sort: { fields: startDate, order: DESC }
      filter: { startDateTimestamp: { gt: $now } }
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
