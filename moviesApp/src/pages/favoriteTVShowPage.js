import React, { useContext } from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromTVShowFavorites from "../components/cardIcons/removeFromTVShowFavourites";
//import WriteReview from "../components/cardIcons/writeReview";

const FavoriteTVShowsPage = () => {
  const {tvShowFavourites: showIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteShowsQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["tvShow", { id: showId }],
        queryFn: getTVShow,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteShowsQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const shows = favoriteShowsQueries.map((q) => q.data);

  return (
    <PageTemplate
      name="Favourite TV Shows"
      shows={shows}
      action={(show) => {
        return (
          <>
            <RemoveFromTVShowFavorites show={show} />
          </>
        )
      }}
    />
  );
};

export default FavoriteTVShowsPage;