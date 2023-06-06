import "../Styles/Movie.scss";
import useQueryParams from "../Hooks/useQueryParams";
import MovieRatings from "../Components/MovieRatings";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HaveToSignupModal from "../Components/HaveToSignupModal";
import MovieCard from "../Components/MovieCard";

const RenderMovie = () => {
  const params = useQueryParams();
  const movieTitle = params.get("title");
  const navigate = useNavigate();
  const [myMovies, setMyMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [movieRates, setMovieRates] = useState([]);
  const [movieTitles, setMovieTitles] = useState([]);
  const [openHaveToSignupModal, setOpenHaveToSignupModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!user._id) {
      return;
    }
    getMovies();
  }, [user._id]);

  const getMovies = () => {
    axios
      .get("http://localhost:3636/movie/" + user._id)
      .then(({ data }) => {
        console.log(data);
        setMyMovies(data);
        setMovieTitles(data.map((mov) => mov.title));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!movieTitle) return null;

    axios
      .get(`http://localhost:3636/api/title/${movieTitle}`)
      .then(({ data }) => {
        console.log(data);
        setMovie(data);
        setMovieRates(data.Ratings);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [movieTitle]);

  useEffect(() => {
    if (!movieTitle) return;

    toggleTheButton();
  }, [movieTitles]);

  const toggleTheButton = () => {
    if (movieTitles.includes(movieTitle)) {
      setToggle(true);
    }
  };

  const AddToYourMovies = async (title, year, type, director) => {
    if (!movieTitles.includes(title)) {
      await axios
        .post("http://localhost:3636/movie/", {
          title: title,
          year: year,
          type: type,
          director: director,
          owner: user._id,
        })
        .catch((err) => console.log(err));
      setMovieTitles([...movieTitles, title]);
      console.log(movieTitles);
      setToggle(true);
    } else {
      alert("This movie already has been added.");
    }
  };

  return (
    <div>
      <div className="movie-card-container">
        {loading ? (
          <ClipLoader
            color={"  var(--basic-color)"}
            className="loading"
            loading={loading}
            cssOverride={{ marginBottom: " 10vw" }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <MovieCard
            movie={movie}
            movieRates={movieRates}
            MovieRatings={MovieRatings}
            user={user}
            toggle={toggle}
            AddToYourMovies={AddToYourMovies}
            setOpenHaveToSignupModal={setOpenHaveToSignupModal}
          />
        )}
      </div>
      <HaveToSignupModal
        open={openHaveToSignupModal}
        onClose={() => {
          setOpenHaveToSignupModal(false);
        }}
      />
    </div>
  );
};

export default RenderMovie;
