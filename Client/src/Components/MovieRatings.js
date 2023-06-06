import "../Styles/Movie.scss";

const MovieRatings = (movieRates) => {
  let rates = movieRates.movieRates;

  if (rates.length) {
    if (rates.length === 1) {
      return;
    } else if (rates.length === 2) {
      return (
        <div className="other-movie-ratings">
          <h6>
            {" "}
            {rates[1].Source} : {rates[1].Value}{" "}
          </h6>
        </div>
      );
    } else {
      return (
        <div className="other-movie-ratings-div">
          <div className="other-movie-ratings">
            <h6>
              {rates[1].Source} : {rates[1].Value}
            </h6>
          </div>
          <div className="other-movie-ratings">
            <h6>
              {rates[2].Source} : {rates[2].Value}
            </h6>
          </div>
        </div>
      );
    }
  } else return;
};

export default MovieRatings;
