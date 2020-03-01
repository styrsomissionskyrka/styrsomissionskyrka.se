import React from 'react';
import { Link, graphql, PageComponentProps } from 'gatsby';

import { Navigation } from '../navigation';
import { Pagination } from '../components/Pagination';
import { EventsArchiveQuery } from './__generated__/EventsArchiveQuery';

const EventArchive: React.FC<PageComponentProps<EventsArchiveQuery>> = ({
  data,
}) => {
  const { pageInfo, edges: events } = data.allContentfulEvent;

  return (
    <div>
      <h2>Events</h2>
      {events.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.formattedSlug}>{node.title}</Link>
        </li>
      ))}
      <Pagination {...pageInfo} pathBase={Navigation.EVENTS} />
    </div>
  );
};

export default EventArchive;

export const query = graphql`
  query EventsArchiveQuery($limit: Int!, $skip: Int!) {
    contentfulPage(slug: { eq: "kalender" }) {
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
        currentPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
