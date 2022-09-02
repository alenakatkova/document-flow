import { useState, useEffect, useCallback } from "react";
import { instance } from "./utils";

const useFetch = <T>(url : string, initialState : T) => {
  const [data, setData] = useState<T>(initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  const fetchData = useCallback(async () => {
    await instance
        .get(url)
        .then(res => {
          setData(res.data === undefined ? [] : res.data);
        });
  }, [url]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return { data, isLoading, error, fetchData }
}

export default useFetch