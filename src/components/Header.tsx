import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Navigation, formatUrl } from '../navigation';
import { MenuQuery } from './__generated__/MenuQuery';

export const Header: React.FC = () => {
  const data = useStaticQuery<MenuQuery>(MENU_QUERY);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={Navigation.HOME}>Hem</Link>
          </li>
          {data.allContentfulPage.edges.map(
            ({ node }) =>
              node.slug &&
              node.title && (
                <li key={node.id}>
                  <Link
                    to={formatUrl(Navigation.PAGE, {
                      slug: node.slug,
                    })}
                  >
                    {node.title}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </nav>
    </header>
  );
};

const MENU_QUERY = graphql`
  query MenuQuery {
    allContentfulPage(
      filter: { includeInMenu: { eq: true }, slug: { ne: "start" } }
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
`;
