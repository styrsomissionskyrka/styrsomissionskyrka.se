import React from 'react';
import { graphql, Link, PageComponentProps } from 'gatsby';
import { Header } from '../components/Header';
import { Navigation, formatUrl } from '../navigation';
import { IndexQuery } from './__generated__/IndexQuery';

const IndexPage: React.FC<PageComponentProps<IndexQuery>> = ({ data }) => {
  const { site, allContentfulEvent } = data;
  return (
    <div>
      <Header />
      <h1>{site?.siteMetadata?.title}</h1>
      <ul>
        {allContentfulEvent.edges.map(({ node }) => (
          <li key={node.id}>
            <Link
              to={formatUrl(Navigation.EVENT, {
                slug: node.slug ?? '',
              })}
            >
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
