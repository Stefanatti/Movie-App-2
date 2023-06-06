import "../Styles/Signup-Login.scss";
import { Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/signup", {
        username,
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.message === true) {
          navigate("/login");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div>
      <div id="signup-page">
        <div className="signup-poster">
          <img src="https://alternativemovieposters.com/wp-content/uploads/2015/01/anthonygenuardi_spaceodyssey700.jpg" />
        </div>
        <div className="signup-form">
          <Container id="main-container">
            <main className="form-signin w-100 m-auto">
              <form>
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <div className="form-floating">
                  <input
                    type="text"
                    value={username}
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
                    type="email"
                    value={email}
                    className="form-control"
                    id="floatingInput"
                    placeholder="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    value={password}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="login-option">
                  <p>
                    If you already have account{" "}
                    <span
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </span>
                  </p>
                </div>
                <button
                  className=" button-submit "
                  type="submit"
                  onClick={(e) => {
                    signUp(e);
                  }}
                >
                  Sign up
                </button>
              </form>
            </main>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Signup;
