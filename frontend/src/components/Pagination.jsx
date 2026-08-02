export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Si solo hay 1 página, no mostramos los botones de paginación
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀ Anterior
      </button>

      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente ▶
      </button>
    </div>
  );
};