import React from "react";
import { Pagination } from "react-bootstrap";
import "./Pagination.css";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        className="pagination-item"
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="pagination-container">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationComponent;
