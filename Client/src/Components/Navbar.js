import "../Styles/Navbar.scss";
import { useNavigate } from "react-router-dom";
import HaveToSignupModal from "./HaveToSignupModal";
import LogoutModal from "./LogoutModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLocation } from "react-router-dom";
//import { Nav } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [openHaveToSignupModal, setOpenHaveToSignupModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [navSearch, setNavSearch] = useState(true);

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
    } else setUser(null);
  }, [localStorage.getItem("token")]);

  const getTitle = (e) => {
    e.preventDefault();
    if (title !== "") {
      navigate(`/MovieSearch?title=${title}`);
      setTitle("");
    }
  };

  useEffect(() => {
    const path = location.pathname;
    const pageName = path.substring(1);
    console.log(pageName);
    if (!pageName) {
      setNavSearch(false);
    }
  }, []);

  return (
    <div className="navbar-div">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div class="container-fluid">
          <a
            onClick={() => navigate("/")}
            className="navbar-brand nav-link"
            href="#"
          >
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {user ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">{user.username}</li>
                <li className="nav-item"></li>

                <li className="nav-item">
                  <a
                    onClick={() => navigate(`/yourmovies?title=${title}`)}
                    className="nav-link"
                    href="#"
                  >
                    Your Movies
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    onClick={() => {
                      setOpenLogoutModal(true);
                    }}
                    className="nav-link"
                    href="#"
                  >
                    Logout
                  </a>
                </li>

                <li className="nav-item search">
                  <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                      <form
                        onSubmit={getTitle}
                        className="d-flex"
                        role="search"
                      >
                        <input
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                          className="form-control me-2"
                          type="text"
                          value={title}
                          placeholder="Search for a movie"
                          aria-label="Search"
                        />

                        <button className="btn nav-link" type="submit">
                          <SearchOutlined className="search-icon" />
                        </button>
                      </form>
                    </div>
                  </nav>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setOpenHaveToSignupModal(true);
                    }}
                    className="nav-link"
                    href="#"
                  >
                    Your Movies
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    onClick={() => navigate("/signup")}
                    className="nav-link"
                    href="#"
                  >
                    Signup
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => navigate("/login")}
                    className="nav-link"
                    href="#"
                  >
                    Login
                  </a>
                </li>
                {navSearch ? (
                  <li className="nav-item search">
                    <nav className="navbar bg-body-tertiary">
                      <div className="container-fluid">
                        <form
                          onSubmit={getTitle}
                          className="d-flex"
                          role="search"
                        >
                          <input
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            className="form-control me-2"
                            type="text"
                            value={title}
                            placeholder="Search for a movie"
                            aria-label="Search"
                          />

                          <button
                            className="search-btn btn nav-link"
                            type="submit"
                          >
                            <SearchOutlined className="search-icon" />
                          </button>
                        </form>
                      </div>
                    </nav>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            )}
            <HaveToSignupModal
              open={openHaveToSignupModal}
              onClose={() => {
                setOpenHaveToSignupModal(false);
              }}
            />
            <LogoutModal
              open={openLogoutModal}
              onClose={() => {
                setOpenLogoutModal(false);
              }}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
