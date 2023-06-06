require("dotenv").config({ path: ".env" });

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const url = `${process.env.API_URL}/?apikey=${process.env.API_KEY}`;
const options = {
  method: "GET",
};

const searchForMovies = (req, res) => {
  const query = req.params.search;
  fetch(`${url}&s=${query}`, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
};

const searchForOneMovie = (req, res) => {
  const query = req.params.title;
  fetch(`${url}&t=${query}`, options)
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
};

module.exports = {
  searchForMovies,
  searchForOneMovie,
};
