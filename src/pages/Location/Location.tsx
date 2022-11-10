import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import spinner from "../../assets/images/spinner.gif";

const Location = () => {
  const listInnerRef = useRef<HTMLUListElement>(null);
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [lastList, setLastList] = useState(false); // setting a flag to know the last list

  const proxy_url = "https://corsproblemsolve.herokuapp.com/"; //cors solution
  const api_url = "https://dev-api.confidence.org/v2/confidence/locations";

  const { loading, locations, error } = useFetch(
    proxy_url + api_url,
    currPage,
    prevPage,
    setPrevPage,
    lastList,
    setLastList
  );

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
      }
    }
  };

  return (
    <div className="home">
      <ul
        className="locations"
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {locations.map((location) => (
          <li className="location-item" key={location.id} data-testid="">
            <p className="location-item-row">
              <span>Detail:</span>
              <span>
                {location.locationDetails
                  ? location.locationDetails
                  : "No data"}
              </span>
            </p>
            <p className="location-item-row">
              <span>Location:</span>
              <span>
                {location.address.city + ", " + location.address.state}
              </span>
            </p>
            <p className="location-item-row">
              <span>LocationType:</span>
              <span>{location.locationType}</span>
            </p>
          </li>
        ))}
      </ul>
      {loading && <img alt="Loading..." className="loading" src={spinner} />}
      {error && <span>Error...</span>}
    </div>
  );
};

export default Location;
