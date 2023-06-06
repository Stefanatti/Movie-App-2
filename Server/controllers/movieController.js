const Movie = require("../modules/movieModule");
//const fetch = import("node-fetch");

const getMovie = async (req, res) => {
  try {
    let movies = await Movie.find({ owner: req.params.id }).populate("owner");
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

const addMovie = (req, res) => {
  let newMovie = new Movie(req.body);
  newMovie.save();
  res.send({ message: "inserted " });
};

const deleteMovie = async (req, res) => {
  await Movie.deleteOne({ _id: req.params.id });
  res.send({ message: "Movie deleted" });
};

const watchMovie = async (req, res) => {
  const movie = await Movie.findOne({ _id: req.params.id });
  movie.watched = !movie.watched;
  movie.save();
  res.send(movie);
};

// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

// const fetchMovies = (req, res) => {
//   //console.log(req.params.title);
//   console.log("fetching is called");
//   const query = req.params.query;
//   const url = `http://www.omdbapi.com/?apikey=b0559c16`;
//   const options = {
//     method: "GET",
//   };

//   //const params = new URLSearchParams("tar");
//   fetch(`${url}&s=${query}`, options)
//     .then((res) => res.json())
//     .then((json) => res.send(json))
//     .catch((err) => console.error("error:" + err));
//   //console.log(req.params);
// };

module.exports = {
  getMovie,
  addMovie,
  deleteMovie,
  watchMovie,
  //fetchMovies,
};
