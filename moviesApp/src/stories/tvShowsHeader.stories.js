import React from "react";
import TVShowsHeader from "../components/headerTVShowList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "TV Shows Page/TVShowPageHeader",
  component: TVShowsHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <TVShowsHeader name="Discover TV Shows" />;

Basic.storyName = "Default";
