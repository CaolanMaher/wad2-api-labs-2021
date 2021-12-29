import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AddToTVShowFavoritesIcon = ({ show }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleAddToTVShowFavorites = (e) => {
    e.preventDefault();
    context.addToTVShowFavourites(show);
    console.log("Add Tv Favourite");
    authContext.addToFavoritesShow(show);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToTVShowFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVShowFavoritesIcon;