const MoviesResultCards = ({ movies, navigate }) => {
  return (
    <div className="cards-container">
      {movies ? (
        movies.map((movie) => {
          return (
            <div key={movie.imdbID} className="movie-cards">
              {movie.Poster !== "N/A" ? (
                <div className="movie-poster">
                  <img src={movie.Poster} alt="poster" />
                </div>
              ) : (
                ""
              )}
              <div className="card-bodies">
                <div className="movie-details-div">
                  <h1
                    className="movie-title"
                    onClick={() => navigate(`/movie?title=${movie.Title}`)}
                  >
                    Movie: {movie.Title}
                  </h1>
                  <h3>{movie.Year}</h3>
                  <h5>{movie.Type}</h5>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-results-label">
          <h1>No results found</h1>
        </div>
      )}
    </div>
  );
};

export default MoviesResultCards;
