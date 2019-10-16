import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { MenuQuery } from '../gatsby-queries';

export const Header: React.FC = () => {
  const data = useStaticQuery<MenuQuery>(graphql`
    query MenuQuery {
      allContentfulPage(
        filter: { includeInMenu: { eq: true } }
        sort: { fields: menuPosition, order: ASC }
      ) {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `);

  return (
    <header>
      <nav>
        <ul>
          {data.allContentfulPage.edges.map(
            ({ node }) =>
              node.slug &&
              node.title && (
                <li key={node.id}>
                  <Link to={node.slug}>{node.title}</Link>
                </li>
              ),
          )}
        </ul>
      </nav>
    </header>
  );
};
