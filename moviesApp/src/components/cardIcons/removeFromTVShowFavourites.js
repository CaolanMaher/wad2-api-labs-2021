import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
//import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const RemoveFromTVShowFavoritesIcon = ({ show }) => {
  //const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleRemoveFromTVShowFavorites = (e) => {
    e.preventDefault();
    //context.removeFromTVShowFavourites(show);
    authContext.removeFromFavoritesShow(show);
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