import { useState, useEffect } from "react";

const ThemeSwitcher = ({ theme, setTheme }) => {
  const [switcher, setSwitcher] = useState(false);
  const [moveBall, setMoveBall] = useState();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      console.log(localStorage.getItem("theme"));
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  return (
    <div className="switch">
      <div className="switch-radios">
        <input
          onChange={() => {
            setMoveBall(3);
            setTheme("");
          }}
          type="radio"
          name="theme-type"
          value="one"
          id="first"
        />
        <input
          onChange={() => {
            setMoveBall(27);
            setTheme("blue-theme");
          }}
          type="radio"
          name="theme-type"
          value="two"
          id="second"
        />
        <input
          onChange={() => {
            setMoveBall(52);
            setTheme("purple-theme");
          }}
          type="radio"
          name="theme-type"
          value="three"
          id="third"
        />
      </div>

      <div className="ball" style={{ left: moveBall }}></div>
    </div>
  );
};

export default ThemeSwitcher;
