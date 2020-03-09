import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { EventQuery } from './__generated__/EventQuery';

const Event: React.FC<PageProps<EventQuery>> = ({ data }) => {
  const { contentfulEvent } = data;
  return <h1>{contentfulEvent?.title}</h1>;
};

export default Event;

export const query = graphql`
  query EventQuery($id: String) {
    contentfulEvent(id: { eq: $id }) {
      startDate
      title
    }
  }
`;
