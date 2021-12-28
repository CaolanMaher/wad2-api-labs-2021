import React from "react";
import TVShowReview from "../components/tvShowReview";
import SampleTVShowReview from "./sampleTVShowReview";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "TV Show Review Page/TVShowReview",
  component: TVShowReview,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <TVShowReview review={SampleTVShowReview} />;

Basic.storyName = "Default";