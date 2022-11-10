import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useFetch from "./useFetch";

jest.mock("axios");

test("fetch data correctly", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockResolvedValueOnce({
    data: {},
  });

  const { result } = renderHook(() =>
    useFetch(
      "https://corsproblemsolve.herokuapp.com/https://dev-api.confidence.org/v2/confidence/locations",
      0,
      1,
      () => {},
      false,
      () => {}
    )
  );
});
