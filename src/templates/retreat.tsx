import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { RetreatQuery } from '../gatsby-queries';

interface Props extends PageRendererProps {
  data: RetreatQuery;
}

const Event: React.FC<Props> = ({ data }) => {
  return <h1>{data.contentfulRetreat && data.contentfulRetreat.title}</h1>;
};

export default Event;

export const pageQuery = graphql`
  query RetreatQuery($id: String) {
    contentfulRetreat(id: { eq: $id }) {
      startDate
      title
    }
  }
`;
