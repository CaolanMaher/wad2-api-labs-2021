import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getTVShowGenres } from "../../api/tmdb-api";
import { getTVShowLanguages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
//import { getTopRatedTVShow } from "../../api/tmdb-api";
//import { getLatestTVShows } from "../../api/tmdb-api";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: "rgb(204, 204, 0)",
  },
  media: { height: 300 },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
}));

export default function FilterMoviesCard(props) {
  const classes = useStyles();
  const { data, error, isLoading, isError } = useQuery("TVShowgenres", getTVShowGenres);
  const { data: languages, error: languagesError, isLoading: languagesIsLoading, isError: languagesIsError } = useQuery("showLanguages", getTVShowLanguages);
  //const { data: rated, error: ratedError, isLoading: ratedIsLoading, isError: ratedIsError } = useQuery("showProviders", getTopRatedTVShow);
  //const { data: latest, error: latestError, isLoading: latestIsLoading, isError: latestIsError } = useQuery("showProviders", getLatestTVShows);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  genres.unshift({ id: "0", name: "All" });

  // languages
  if (languagesIsLoading) {
    return <Spinner />;
  }

  if (languagesIsError) {
    return <h1>{languagesError.message}</h1>;
  }
  const languagesList = languages;
  if(languagesList[0].iso_639_1 !== "0") {
    languagesList.unshift({ iso_639_1: "0", english_name: "All" });
  }

  // LATEST
  //if (ratedIsLoading) {
  //  return <Spinner />;
  //}

  //if (ratedIsError) {
  //  return <h1>{ratedError.message}</h1>;
  //}
  const sortBy = ["Nothing", "Top Rated", "Least Rated", "Popularity"];
  //ratedShows.unshift({id: "1", name: "Top Rated"});
  //ratedShows.unshift({id: "2", name: "Latest"});
  //if(latest[0].iso_639_1 !== "0") {
  //  providers.unshift({ iso_639_1: "0", english_name: "All" });
  //}

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleLanguagesChange = (e) => {
    handleChange(e, "provider", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the TV Shows.
        </Typography>
        <TextField
          className={classes.formControl}
          id="filled-search"
          label="Search field"
          type="search"
          value={props.titleFilter}
          variant="filled"
          onChange={handleTextChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="providers-label">Languages</InputLabel>
            <Select
              labelId="providers-label"
              id="providers-select"
              value={props.languagesFilter}
              onChange={handleLanguagesChange}
            >
              {languagesList.map((language) => {
                return (
                  <MenuItem key={language.iso_639_1} value={language.iso_639_1}>
                    {language.english_name}
                  </MenuItem>
                );
              })}
            </Select>
        </FormControl>
        <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Sort the TV Shows.
          <br />
        </Typography>
      </CardContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="sortby-label">Sort By</InputLabel>
            <Select
              labelId="sortby-label"
              id="sortby-select"
              value={props.sortFilter}
              onChange={handleSortChange}
            >
              {sortBy.map((sortByItem) => {
                return (
                  <MenuItem key={sortByItem} value={sortByItem}>
                    {sortByItem}
                  </MenuItem>
                );
              })}
            </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}