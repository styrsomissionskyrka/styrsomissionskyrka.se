import React from 'react';
import { graphql } from 'gatsby';
import { PageQuery } from '../gatsby-queries';

interface Props {
  data: PageQuery;
}

const Event: React.FC<Props> = ({ data }) => {
  return <h1>{data.contentfulPage && data.contentfulPage.title}</h1>;
};

export default Event;

export const pageQuery = graphql`
  query PageQuery($id: String) {
    contentfulPage(id: { eq: $id }) {
      title
    }
  }
`;
