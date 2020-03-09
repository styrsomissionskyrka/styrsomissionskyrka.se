import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';

import { Navigation } from '../navigation';
import { Pagination } from '../components/Pagination';
import { EventsArchiveQuery } from './__generated__/EventsArchiveQuery';

const EventsArchive: React.FC<PageProps<EventsArchiveQuery>> = ({ data }) => {
  const { pageInfo, edges: events } = data.allContentfulEvent;

  return (
    <div>
      <h2>Events</h2>
      {events.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.formattedSlug}>{node.title}</Link>
        </li>
      ))}
      <Pagination pageInfo={pageInfo} pathBase={Navigation.EVENTS} />
    </div>
  );
};

export default EventsArchive;

export const query = graphql`
  query EventsArchiveQuery($limit: Int!, $skip: Int!, $slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
    }

    allContentfulEvent(
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
