import "../Styles/MovieSearch.scss";
import useQueryParams from "../Hooks/useQueryParams";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import MoviesResultCards from "../Components/MoviesResultCards";

const MovieSearchResult = () => {
  const params = useQueryParams();
  const movieTitle = params.get("title");
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!movieTitle) return null;
    axios
      .get(`http://localhost:3636/api/${movieTitle}`)
      .then(({ data }) => {
        console.log(data);
        setMovies(data.Search);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [movieTitle]);

  return (
    <div>
      {loading ? (
        <ClipLoader
          color={"  var(--basic-color)"}
          className="loading"
          loading={loading}
          cssOverride={{ marginLeft: " 50vw", marginTop: " 10vw" }}
          size={50}
        />
      ) : (
        <div>
          <MoviesResultCards movies={movies} navigate={navigate} />
        </div>
      )}
    </div>
  );
};

export default MovieSearchResult;
