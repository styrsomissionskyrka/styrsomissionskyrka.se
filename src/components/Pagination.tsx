import React from 'react';
import { Link, graphql } from 'gatsby';
import { formatPaginatedUrl } from '../navigation';
import { PaginationInfo } from './__generated__/PaginationInfo';

interface Props {
  pageInfo: PaginationInfo;
  pathBase: string;
}

export const Pagination: React.FC<Props> = ({ pageInfo, pathBase }) => {
  const { hasNextPage, hasPreviousPage, currentPage } = pageInfo;
  const nextPagePath = formatPaginatedUrl(pathBase, currentPage + 1);
  const prevPagePath = formatPaginatedUrl(pathBase, currentPage - 1);

  return (
    <div>
      {hasPreviousPage && <Link to={prevPagePath}>Prev</Link>}
      {hasNextPage && <Link to={nextPagePath}>Next</Link>}
    </div>
  );
};

export const query = graphql`
  fragment PaginationInfo on PageInfo {
    currentPage
    hasNextPage
    hasPreviousPage
  }
`;
