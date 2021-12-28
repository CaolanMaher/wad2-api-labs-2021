import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AddToTVShowFavoritesIcon = ({ show }) => {
  const context = useContext(MoviesContext);

  const handleAddToTVShowFavorites = (e) => {
    e.preventDefault();
    context.addToTVShowFavourites(show);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToTVShowFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVShowFavoritesIcon;