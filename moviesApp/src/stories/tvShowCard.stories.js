import React from "react";
import TVShowCard from "../components/tvShowCard";
import SampleTVShow from "./sampleTVShows";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { action } from "@storybook/addon-actions";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

export default {
  title: "TV Shows/TVShowCard",
  component: TVShowCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  return (
    <TVShowCard
      show={SampleTVShow}
      action={(show) => <AddToFavoritesIcon show={show} />}
      taging={(show) => null}
    />
  );
};
Basic.storyName = "Default";

export const Exceptional = () => {
  const sampleNoPoster = { ...SampleTVShow, poster_path: undefined };
  return (
    <TVShowCard
      show={sampleNoPoster}
      action={(show) => <AddToFavoritesIcon show={show} />}
      taging={(show) => null}
    />
  );
};
Exceptional.storyName = "exception";
