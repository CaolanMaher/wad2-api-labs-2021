import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromTVShowFavoritesIcon = ({ show }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromTVShowFavorites = (e) => {
    e.preventDefault();
    context.removeFromTVShowFavourites(show);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromTVShowFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromTVShowFavoritesIcon;