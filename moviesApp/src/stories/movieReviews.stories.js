import React from "react";
import MovieReviews from "../components/movieReviews";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Movie Reviews Page/MovieReviews",
  component: MovieReviews,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <MovieReviews movie={SampleMovie} />;

Basic.storyName = "Default";