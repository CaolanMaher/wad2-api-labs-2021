import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getMoviesPage } from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: theme.spacing(1.5),
  },
}));

const HomePage = (props) => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading, isError, isPreviousData }  = useQuery(['discover', page], () => getMoviesPage(page), { keepPreviousData : true })

  const classes = useStyles();

  console.log(page);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      } } />
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

export default HomePage;