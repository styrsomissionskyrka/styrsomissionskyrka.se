import React from 'react';
import { graphql } from 'gatsby';
import { EventQuery } from '../gatsby-queries';

interface Props {
  data: EventQuery;
}

const Event: React.FC<Props> = ({ data }) => {
  return <h1>{data.contentfulEvent && data.contentfulEvent.title}</h1>;
};

export default Event;

export const pageQuery = graphql`
  query EventQuery($id: String) {
    contentfulEvent(id: { eq: $id }) {
      startDate
      title
    }
  }
`;
