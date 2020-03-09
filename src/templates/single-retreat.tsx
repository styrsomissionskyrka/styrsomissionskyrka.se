import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { RetreatQuery } from './__generated__/RetreatQuery';

const Event: React.FC<PageProps<RetreatQuery>> = ({ data }) => {
  const { contentfulRetreat } = data;
  return <h1>{contentfulRetreat?.title}</h1>;
};

export default Event;

export const query = graphql`
  query RetreatQuery($id: String) {
    contentfulRetreat(id: { eq: $id }) {
      startDate
      title
    }
  }
`;
