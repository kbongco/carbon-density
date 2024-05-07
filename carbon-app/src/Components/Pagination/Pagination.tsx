import React from "react";
import { PaginationComponent } from '../../interfaces/component-interfaces';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import './Pagination.scss';

interface PaginationProps extends PaginationComponent {}

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };
  
  return (
    <div className='carbon-density-pagination-container-comp'>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
      <FontAwesomeIcon icon={faBackward} />
      </button>
      <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        <FontAwesomeIcon icon={faForward} />
        </button>
    </div>
  );
}
