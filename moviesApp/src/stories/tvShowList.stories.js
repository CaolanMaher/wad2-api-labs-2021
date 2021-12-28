import React from "react";
import TVShowList from "../components/tvShowList";
import SampleTVShow from "./sampleTVShows";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Grid from "@material-ui/core/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "TV Shows Page/TVShowList",
  component: TVShowList,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => {
  const shows = [
    { ...SampleTVShow, id: 1 },
    { ...SampleTVShow, id: 2 },
    { ...SampleTVShow, id: 3 },
    { ...SampleTVShow, id: 4 },
    { ...SampleTVShow, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <TVShowList
        shows={shows}
        action={(show) => <AddToFavoritesIcon show={show} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";
