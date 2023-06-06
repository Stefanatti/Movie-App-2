import "../Styles/Signup-Login.scss";
import { Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/login", {
        username,
        password,
      })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div>
      <div id="signup-page">
        <div className="signup-poster">
          <img src="https://alternativemovieposters.com/wp-content/uploads/2021/12/Beth-Morris_EyesWideShut.jpg" />
        </div>
        <div className="signup-form">
          <Container id="main-container">
            <main className="form-signin w-100 m-auto">
              <form>
                <h1 className="h3 mb-3 fw-normal">Please Login</h1>

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button
                  className="button-submit"
                  type="submit"
                  onClick={(e) => {
                    login(e);
                  }}
                >
                  Login
                </button>
              </form>
            </main>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Login;
