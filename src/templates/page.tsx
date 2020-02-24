import React from 'react';
import { graphql, PageComponentProps } from 'gatsby';
import { PageQuery } from './__generated__/PageQuery';

const Event: React.FC<PageComponentProps<PageQuery>> = ({ data }) => {
  const { contentfulPage } = data;
  return <h1>{contentfulPage?.title}</h1>;
};

export default Event;

export const query = graphql`
  query PageQuery($id: String) {
    contentfulPage(id: { eq: $id }) {
      title
    }
  }
`;
