import React from "react";
import { Pagination } from "react-bootstrap";
import "./Pagination.css";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const isTabletOrMobile = window.innerWidth <= 768; // Define el ancho máximo para tablet y móvil

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Renderiza solo los botones necesarios según la página actual y el total de páginas
  const renderPaginationItems = () => {
    const items = [];

    // Botón anterior
    if (currentPage > 1) {
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
        />
      );
    }

    // Número de la página actual
    items.push(
      <Pagination.Item key={currentPage} active>
        {currentPage}
      </Pagination.Item>
    );

    // Botón siguiente
    if (currentPage < totalPages) {
      items.push(
        <Pagination.Next
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      );
    }

    return items;
  };

  return (
    <div className="pagination-container">
      <Pagination>{renderPaginationItems()}</Pagination>
    </div>
  );
};

export default PaginationComponent;
