import React, { useState } from "react";

export const TVShowsContext = React.createContext(null);

const TVShowsContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( [] )
  const [playlist, setPlaylist] = useState( [] )

  const addToFavorites = (show) => {
    setFavorites([...favorites,show.id])
  };
  // We will use this function in a later section
  const removeFromFavorites = (show) => {
    setFavorites( favorites.filter(
      (mId) => mId !== show.id
    ) )
  };

  const addReview = (show, review) => {
      setMyReviews( {...myReviews, [show.id]: review } )
  };

  const addToPlaylist = (show) => {
    setPlaylist([...playlist,show.id])
  };
  // We will use this function in a later section
  const removeFromPlaylist = (show) => {
    setPlaylist( playlist.filter(
      (mId) => mId !== show.id
    ) )
  };

  return (
    <TVShowsContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </TVShowsContext.Provider>
  );
};

export default TVShowsContextProvider;