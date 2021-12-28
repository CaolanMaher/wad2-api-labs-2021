import React from "react";
import PageTemplate from '../components/templateTVShowListPage'
import { useQuery } from 'react-query'
//import { getTVShows } from "../api/tmdb-api";
import { getTVShowsPage } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddToTVShowFavoritesIcon from '../components/cardIcons/addToTVShowFavourites'
import IconButton from "@material-ui/core/IconButton";
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

const TVShowsPage = (props) => {
  const [page, setPage] = React.useState(1);
  const {  data, error, isLoading, isError, isPreviousData }  = useQuery(['tvShows', page], () => getTVShowsPage(page), { keepPreviousData : true })

  const classes = useStyles();

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
    <>
    <PageTemplate
      name='Discover TV Shows'
      shows={shows}
      action={(show) => {
        return <AddToTVShowFavoritesIcon show={show} />
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

export default TVShowsPage;