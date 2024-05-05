import React from "react";
import { PaginationComponent } from '../../interfaces/component-interfaces';

interface PaginationProps extends PaginationComponent {}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };
  
  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
        Previous
      </button>
      <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
}
