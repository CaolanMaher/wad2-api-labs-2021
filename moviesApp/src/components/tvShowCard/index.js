import React, { useContext  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
//import { TVShowsContext } from "../../contexts/tvShowsContext";

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function TVShowCard({ show, action }) {
  const classes = useStyles();
  const { tvShowFavourites } = useContext(MoviesContext);
  //const { playlist } = useContext(MoviesContext);

  if (tvShowFavourites.find((id) => id === show.id)) {
    show.favorite = true;
  } else {
    show.favorite = false
  }

  //if(playlist.find((id) => id === show.id)) {
  //  show.playlist = true;
  //} else {
  //  show.playlist = false
  //}

  return (
    <Card className={classes.card}>
      <CardHeader
      className={classes.header}
      avatar={
        show.favorite ? (
          <Avatar className={classes.avatar}>
            <FavoriteIcon />
          </Avatar>
        ) : show.playlist ? (
          <Avatar className={classes.avatar}>
            <PlaylistAddCheckIcon />
          </Avatar>
        ) : null
      }
      title={
        <Typography variant="h5" component="p">
          {show.name}{" "}
        </Typography>
      }
    />
    <Link to={`/tvshows/${show.id}`}>
      <CardMedia
        className={classes.media}
        image={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
      />
      </Link>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {show.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {show.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(show)}
      </CardActions>
    </Card>
  );
}