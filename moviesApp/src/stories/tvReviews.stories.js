import React from "react";
import TVShowReviews from "../components/tvShowReviews";
import SampleTVShow from "./sampleTVShows";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "TV Show Reviews Page/TVShowReviews",
  component: TVShowReviews,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <TVShowReviews show={SampleTVShow} />;

Basic.storyName = "Default";