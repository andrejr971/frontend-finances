import React, { useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';

import { IMeta } from '../../hooks/dashboard';
import { Container } from './styles';

interface PaginationProps {
  meta: IMeta;
  setPages(pages: number): void;
}

interface SelectedItem {
  selected: number;
}

const Pagination: React.FC<PaginationProps> = ({ meta, setPages }) => {
  const handleClick = useCallback(
    ({ selected }: SelectedItem) => {
      setPages(selected + 1);
    },
    [setPages],
  );

  return (
    <Container>
      <ReactPaginate
        previousLabel={<FiChevronLeft />}
        nextLabel={<FiChevronRight />}
        breakLabel="..."
        breakClassName="break"
        pageCount={Math.ceil(meta.total / meta.per_page)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        previousClassName="previus"
        nextClassName="next"
        activeClassName="active"
        disabledClassName="disabled"
        pageClassName="pages"
        onPageChange={handleClick}
      />
    </Container>
  );
};

export default Pagination;
