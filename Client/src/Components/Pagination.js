const Pagination = ({
  totalMovies,
  moviesPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pages">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={
              page == currentPage ? "button-page active" : "button-page "
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
