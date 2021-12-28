import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( [] )
  const [playlist, setPlaylist] = useState( [] )
  const [tvShowFavourites, setTVShowFavourites] = useState( [] )
  //const [tvShowReviews, setTVShowReviews] = useState( [] )

  const addToFavorites = (movie) => {
    setFavorites([...favorites,movie.id])
  };

  const addToTVShowFavourites = (show) => {
    setTVShowFavourites([...tvShowFavourites,show.id])
  };

  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromTVShowFavourites = (show) => {
    setTVShowFavourites( tvShowFavourites.filter(
      (mId) => mId !== show.id
    ) )
  };

  const addReview = (movie, review) => {
      setMyReviews( {...myReviews, [movie.id]: review } )
  };

  //const addTVShowReview = (show, review) => {
  //  setTVShowReviews( {...myReviews, [show.id]: review } )
  //};

  const addToPlaylist = (movie) => {
    setPlaylist([...playlist,movie.id])
  };
  // We will use this function in a later section
  const removeFromPlaylist = (movie) => {
    setPlaylist( playlist.filter(
      (mId) => mId !== movie.id
    ) )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        tvShowFavourites,
        addToFavorites,
        removeFromFavorites,
        removeFromTVShowFavourites,
        addReview,
        //addTVShowReview,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        //setTVShowReviews,
        addToTVShowFavourites,
        //tvShowReviews,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;