const express = require("express");
const app = express();
const userRooter = require("./routers/userRoute.js");
const movieRooter = require("./routers/movieRoute");
const apiRooter = require("./routers/apiRoute");
var bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use("/user", userRooter);
app.use("/movie", movieRooter);
app.use("/api", apiRooter);

app.listen(3636, () => {
  console.log("App is running on the port", 3636);
});
