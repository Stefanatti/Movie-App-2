import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect((url) => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      axios
        .post(url, {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return { data, loading, error };
};

export default useFetch;
