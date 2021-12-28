import React from "react";
import MovieReview from "../components/movieReview";
import SampleMovieReview from "./sampleMovieReview";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Movie Review Page/MovieReview",
  component: MovieReview,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <MovieReview review={SampleMovieReview} />;

Basic.storyName = "Default";