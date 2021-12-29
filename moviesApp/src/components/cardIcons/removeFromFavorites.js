import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
//import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
  //const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    //context.removeFromFavorites(movie);
    authContext.removeFromFavorites(movie);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;