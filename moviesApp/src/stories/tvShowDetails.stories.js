import React from "react";
import TVShowDetails from "../components/tvShowDetails";
import SampleTVShow from "./sampleTVShows";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "TV Show Details Page/TVShowDetails",
  component: TVShowDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <TVShowDetails show={SampleTVShow} />;

Basic.storyName = "Default";
