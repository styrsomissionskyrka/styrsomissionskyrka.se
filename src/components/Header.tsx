import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { isNotNull } from '../utils';
import { Logotype } from './Logotype';
import { MenuQuery } from './__generated__/MenuQuery';

export const Header: React.FC = () => {
  const data = useStaticQuery<MenuQuery>(MENU_QUERY);
  const menuItems = (data.menu?.items ?? []).filter(isNotNull);

  return (
    <header className="flex items-center px-2 pt-2">
      <div className="mr-8">
        <Logotype className="w-20 h-auto text-black" />
      </div>

      <nav>
        <ul className="flex items-center">
          {menuItems.map(item => (
            <li key={item.id}>
              <Link
                className="px-2 hover:text-blue-500"
                to={item.formattedSlug}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const MENU_QUERY = graphql`
  query MenuQuery {
    menu: contentfulMenu(position: { eq: "top" }) {
      id
      name
      items {
        __typename
        ... on ContentfulPage {
          id
          title
          formattedSlug
        }
        ... on ContentfulEvent {
          id
          title
          formattedSlug
        }
        ... on ContentfulRetreat {
          id
          title
          formattedSlug
        }
      }
    }
  }
`;
