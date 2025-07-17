import styles from '../ideas/styles.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  // Logic untuk menampilkan nomor halaman (misal: 1, 2, ..., 5, 6, 7, ..., 10)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Jumlah maksimal nomor halaman yang ditampilkan
    
    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) =>
      number === '...' ? (
        <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
      ) : (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? styles.activePage : ''}
          disabled={currentPage === number}
        >
          {number}
        </button>
      )
    );
  }

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevious} disabled={currentPage === 1}>«</button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>»</button>
    </div>
  );
}