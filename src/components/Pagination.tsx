import React from 'react';
import { Link } from 'gatsby';
import { formatPaginatedUrl } from '../navigation';

interface Props {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  pathBase: string;
}

export const Pagination: React.FC<Props> = ({
  hasNextPage,
  hasPreviousPage,
  currentPage,
  pathBase,
}) => {
  const nextPagePath = formatPaginatedUrl(pathBase, currentPage + 1);
  const prevPagePath = formatPaginatedUrl(pathBase, currentPage - 1);

  return (
    <div>
      {hasPreviousPage && <Link to={prevPagePath}>Prev</Link>}
      {hasNextPage && <Link to={nextPagePath}>Next</Link>}
    </div>
  );
};
