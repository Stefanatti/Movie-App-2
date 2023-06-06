import axios from "axios";
import { useEffect, useState } from "react";

const useGetUser = async (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  setLoading(true);

  await axios
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

  return { data, loading, error };
};

export default useGetUser;
