import "../Styles/YourMoviesLibrary.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import MoviesTable from "../Components/MoviesTable";

const YourMoviesLibrary = () => {
  const navigate = useNavigate();
  const [myMovies, setMyMovies] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const [myUnwatchedMovies, setMyUnwatchedMovies] = useState([]);
  const [watched, setWatched] = useState(false);
  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMyMovies = myMovies.slice(firstMovieIndex, lastMovieIndex);
  const currentMyUnwatchedMovies = myUnwatchedMovies.slice(
    firstMovieIndex,
    lastMovieIndex
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
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
        setMyUnwatchedMovies(data.filter((mov) => !mov.watched));
      })
      .catch((err) => console.log(err));
  };
  console.log(myMovies);
  console.log(myUnwatchedMovies);

  const removeMovie = async (id) => {
    const data = axios
      .delete("http://localhost:3636/movie/" + id)
      .then((res) => {
        getMovies();
        return res;
      });
    getMovies();
    setMyMovies((myMovies) =>
      myMovies.filter((myMovie) => myMovie._id !== data._id)
    );
  };

  const watchedMovie = async (id) => {
    const data = await fetch("http://localhost:3636/movie/watched/" + id, {
      method: "PUT",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error:", err));
    setMyMovies((myMovies) =>
      myMovies.map((myMovie) => {
        if (myMovie._id === data._id) {
          myMovie.watched = data.watched;
        }
        console.log(myMovies);
        return myMovie;
      })
    );
  };

  useEffect(() => {
    if (!search) {
      setMyMovies(myMovies);
    }
  }, [search]);

  const filterMovies = () => {
    setMyMovies(
      myMovies.filter((myMovie) => {
        return search.toLowerCase() === ""
          ? myMovie
          : myMovie.title.toLowerCase().includes(search);
      })
    );
  };

  const filterDirectors = () => {
    setMyMovies(
      myMovies.filter((myMovie) => {
        return search.toLowerCase() === ""
          ? myMovie
          : myMovie.director.toLowerCase().includes(search);
      })
    );
  };

  return (
    <div>
      <h1 className="library-header">Your Movies:</h1>
      {loading ? (
        <ClipLoader
          color={"  var(--basic-color)"}
          className="loading"
          loading={loading}
          cssOverride={{ marginLeft: " 50vw", marginTop: " 10vw" }}
          size={50}
          aria-label="Loading Spinner"
        />
      ) : (
        <div className="movies-table-div">
          <div className="input-div">
            <form
              onChange={() => filterMovies()}
              className="d-flex"
              role="search"
            >
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="form-control me-2 search"
                type="text"
                placeholder="Search for a movie"
                aria-label="Search"
                title="Type in a name"
              />

              <button className="btn nav-link" type="submit">
                <SearchOutlined className="search-icon" />
              </button>
            </form>
            <form
              onChange={() => filterDirectors()}
              className="d-flex directors"
              role="search"
            >
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="form-control me-2 search"
                type="text"
                placeholder="Search for a director"
                aria-label="Search"
              />

              <button className="btn nav-link" type="submit">
                <SearchOutlined className="search-icon" />
              </button>
            </form>
          </div>

          <MoviesTable
            search={search}
            myMovies={myMovies}
            currentMyUnwatchedMovies={currentMyUnwatchedMovies}
            currentMyMovies={currentMyMovies}
            watchedMovie={watchedMovie}
            navigate={navigate}
            removeMovie={removeMovie}
            watched={watched}
            setWatched={setWatched}
          />
          <Pagination
            totalMovies={watched ? myUnwatchedMovies.length : myMovies.length}
            moviesPerPage={moviesPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default YourMoviesLibrary;
