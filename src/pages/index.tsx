import React from 'react';
import { graphql, Link, PageComponentProps } from 'gatsby';
import { IndexQuery } from './__generated__/IndexQuery';
import { Header } from '../components/Header';

const IndexPage: React.FC<PageComponentProps<IndexQuery>> = ({ data }) => {
  const { site, allContentfulEvent } = data;
  return (
    <div>
      <Header />
      <h1>{site && site.siteMetadata && site.siteMetadata.title}</h1>
      <ul>
        {allContentfulEvent.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={`/kalender/${node.slug}`}>
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
    site {
      siteMetadata {
        title
      }
    }

    allContentfulEvent(
      sort: { fields: startDate, order: DESC }
      filter: { isFuture: { eq: true } }
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
