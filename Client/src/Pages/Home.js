import Main from "../Components/Main";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Home() {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.post("http://localhost:3636/user/login", {
      username,
      password,
    });

    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
        });
    }
  }, []);

  return (
    <div>
      <Main />
    </div>
  );
}

export default Home;
