import React from "react";
import PageTemplate from '../components/templateTVShowListPage'
import { useQuery } from 'react-query'
import { getTVShows } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import AddToTVShowFavoritesIcon from '../components/cardIcons/addToTVShowFavourites'

const TVShowsPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('tvShows', getTVShows)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;

  // Redundant, but necessary to avoid app crashing.
  //const favorites = movies.filter(m => m.favorite)
  //localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      name='Discover TV Shows'
      shows={shows}
      action={(show) => {
        return <AddToTVShowFavoritesIcon show={show} />
      }}
    />
  );
};

export default TVShowsPage;