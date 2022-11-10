import { useState, useEffect } from "react";
import axios from "axios";
import { ILocation, IResponseData } from "../types/Location";

const useFetch = (
  apiUrl: string,
  currPage: number,
  prevPage: number,
  setPrevPage: (prevPage: number) => void,
  lastList: boolean,
  setLastList: (prevPage: boolean) => void
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post<IResponseData>(
          apiUrl,
          {
            start: prevPage * 10,
            limit: currPage * 10 - 1,
          },
          {
            headers: {
              Username: "amitphatak$r5labs.com",
            },
          }
        );

        if (!response.data.locations.length) {
          setLastList(true);
          return;
        }

        setPrevPage(currPage);
        setLocations([...locations, ...response.data.locations]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [
    apiUrl,
    currPage,
    lastList,
    locations,
    prevPage,
    setLastList,
    setPrevPage,
  ]);

  return { loading, locations, error };
};

export default useFetch;
