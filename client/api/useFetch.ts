import { useState, useEffect, useCallback } from "react";
import { instance } from "./utils";

const useFetch = <T>(url : string, initialState : T, options? : object) => {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    if (!!options) {
      await instance
          .post(url, options)
          .then(res => {
            setData(res.data === undefined ? [] : res.data);
            console.log(res.data)
            setIsLoading(false);
          })
          .catch(error => {
            setError(error);
            setIsLoading(false);
          });
    } else {
      await instance
          .get(url)
          .then(res => {
            setData(res.data === undefined ? [] : res.data);
            setIsLoading(false);
          })
          .catch(error => {
            setError(error);
            setIsLoading(false);
          });
    }
  }, [url]);

  useEffect(() => {
    setIsLoading(true);
    fetchData().catch(console.error);
  }, [fetchData]);

  return { data, isLoading, error, fetchData }
}

export default useFetch