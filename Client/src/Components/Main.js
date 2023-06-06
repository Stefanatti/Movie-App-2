import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import HaveToSignupModal from "./HaveToSignupModal";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Grid, Paper, Typography, Container, Box } from "@mui/material";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [openHaveToSignupModal, setOpenHaveToSignupModal] = useState(false);

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

  const Poster = ({ url, num, xs, md, height }) => {
    return (
      <Grid item xs={md} md={md}>
        <Paper
          elevation={3}
          className="example"
          sx={{
            border: "2px solid var(--home-page-posters-color)",
            height: `${height}px`,
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {num}
        </Paper>
      </Grid>
    );
  };

  return (
    <div className="main-div">
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-around">
          <Poster
            md={2}
            num={"1"}
            height={100}
            url={
              " https://i.pinimg.com/564x/c1/c8/eb/c1c8ebaba51997369f8c6cccc5ca7aea.jpg "
            }
          />
          <Poster
            height={150}
            md={4}
            num={"2"}
            url={
              "https://i.pinimg.com/564x/64/46/c4/6446c4977328cb7166df18f29288c2a0.jpg"
            }
          />
          <Poster
            md={3}
            num={"4"}
            height={180}
            url={
              "https://alternativemovieposters.com/wp-content/uploads/2019/09/karam_fightclub.jpg"
            }
          />
          <Poster
            md={3}
            num={"4"}
            height={120}
            url={
              "https://i.pinimg.com/564x/89/c7/8d/89c78d2711beb00462fac71236378d20.jpg"
            }
          />
        </Grid>
        <div className="middle-div">
          <Box sx={{ width: "500px" }}>
            <div className="container-fluid">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 "
                  type="text"
                  //value={title}
                  placeholder="Search for a movie"
                  aria-label="Search"
                  style={{
                    outlineColor: "var(--basic-color)",
                    boxShadow: "0 0 0 0.2rem rgba(255, 0, 0, 0.25)",
                  }}
                />

                <button className="btn nav-link" type="submit">
                  <SearchIcon fontSize="large" className="search-icon" />
                </button>
              </form>
            </div>
          </Box>
          <Box>
            <div className="neonText-div">
              <h1
                className="neonText"
                onClick={
                  user
                    ? () => navigate(`/yourmovies`)
                    : () => {
                        setOpenHaveToSignupModal(true);
                      }
                }
              >
                Your <br /> Movies
              </h1>
            </div>
          </Box>
        </div>

        <Grid
          container
          spacing={3}
          marginTop="50px"
          marginBottom="100px"
          justifyContent="space-around"
        >
          <Poster
            md={3}
            num={"1"}
            height={120}
            url={
              "https://i.pinimg.com/originals/92/65/25/926525370b1e2147cf8d756138379456.jpg"
            }
          />
          <Poster
            md={3}
            num={"2"}
            height={150}
            url={
              "https://i.pinimg.com/564x/e3/e8/8f/e3e88f32f7a46ac437ac15e9b921bb5a.jpg"
            }
          />
          <Poster
            md={4}
            num={"4"}
            height={180}
            url={
              "https://alternativemovieposters.com/wp-content/uploads/2017/10/yolli_blade.jpg"
            }
          />
          <Poster
            md={2}
            num={"4"}
            height={160}
            url={
              "https://i.pinimg.com/236x/08/5e/d6/085ed68da55db43d01e5261be6de87b9.jpg"
            }
          />
        </Grid>
      </Container>
      <Box
        sx={{
          width: "100%   ",
          height: "40px",
          backgroundColor: "#1c1b1b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.primary"
          sx={{
            color: "var(--basic-color)",
            alignSelf: "center",
          }}
        >
          Created By Stefanos Kotsios 2023
        </Typography>
      </Box>
    </div>
  );
};

export default Main;
