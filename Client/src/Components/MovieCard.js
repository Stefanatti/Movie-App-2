const MovieCard = ({
  movie,
  movieRates,
  MovieRatings,
  user,
  toggle,
  AddToYourMovies,
  setOpenHaveToSignupModal,
}) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img className="movie-img" src={movie.Poster} alt="movie-poster" />
      </div>
      <div className="card-body">
        <div className="movie-details">
          <h1>{movie.Title}</h1>{" "}
          <h3>
            {movie.Runtime == "1 min" ? "" : `${movie.Runtime}`}
            {"   "} {movie.Year}{" "}
          </h3>
          <h3>{movie.Genre}</h3>
          <h3>
            {movie.Director == "N/A" ? "" : `Director: ${movie.Director}`}
          </h3>
          <h3>Writer: {movie.Writer}</h3>
          <h3>Actors: {movie.Actors}</h3>
          <h4>Plot: {movie.Plot}</h4>{" "}
        </div>
        <div className="reviews">
          <div className="imdb rating">
            <a href={`https://www.imdb.com/title/${movie.imdbID}/`}>
              IMDB: {movie.imdbRating}
            </a>
          </div>
          {movieRates && <MovieRatings movieRates={movieRates} />}
        </div>
        {user ? (
          <div className="button-div">
            <button
              style={
                toggle
                  ? { backgroundColor: " var(--movie-card-button-added)" }
                  : { backgroundColor: "var(--movie-card-button-add)" }
              }
              className="addMovie-button"
              onClick={() => {
                AddToYourMovies(
                  movie.Title,
                  movie.Year,
                  movie.Type,
                  movie.Director == "N/A" ? "-" : movie.Director
                );
              }}
            >
              {toggle ? "In your movies!" : "Add to your movies"}
            </button>
          </div>
        ) : (
          <div className="button-div">
            <button
              style={{ backgroundColor: "var(--movie-card-button-add)" }}
              className="addMovie-button"
              onClick={() => {
                setOpenHaveToSignupModal(true);
              }}
            >
              Add to your movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
