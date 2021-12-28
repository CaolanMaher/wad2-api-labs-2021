import React from "react";
import PageTemplate from '../components/templateMovieListPage'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useQuery } from 'react-query'
//import { getMovies } from "../api/tmdb-api";
import { getUpcomingMoviesPage } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
//import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1.5),
  },
}));

const UpcomingMoviePage = (props) => {
  const [page, setPage] = React.useState(1);
  const {  data, error, isLoading, isError, isPreviousData }  = useQuery(['upcoming', page], () => getUpcomingMoviesPage(page), { keepPreviousData : true })

  const classes = useStyles();

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  //const favorites = movies.filter(m => m.favorite)
  //localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
    <Paper component="div" 
       className={classes.root}
       >
      <IconButton aria-label="go back" 
      onClick={() => {
        if (!isPreviousData && page !== 20) {
          setPage(old => Math.max(old - 1, 0))
        }
      }}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        Current Page: {page}
      </Typography>
      <IconButton aria-label="go forward" 
      onClick={() => {
        if (!isPreviousData && page !== 20) {
          setPage(old => old + 1)
        }}}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
    </>
  );
};

export default UpcomingMoviePage;