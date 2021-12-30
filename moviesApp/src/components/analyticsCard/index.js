import React, { useContext } from "react";
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
import { getGenres } from "../../api/tmdb-api";
import { getMovieLanguages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { AuthContext } from "../../contexts/authContext";
import { getFavouriteMovies } from "../.././api/movie-api";
import { getMovie } from "../.././api/tmdb-api";

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

export default function AnalyticsCard(props) {


  const classes = useStyles();

  /*
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  const { data: languages, error: languagesError, isLoading: languagesIsLoading, isError: languagesIsError } = useQuery("movielanguages", getMovieLanguages);

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

  */

  //const context = useContext(AuthContext);

  const context = useContext(AuthContext);

  const numFavourites = context.favorites.length;

  const favorites = context.favorites;

  console.log(favorites);

  /*
  const getUserFavourites = async (array) => {
    array = await getFavouriteMovies(context.userName);
    //return array;
    console.log("Array" + array);
  }
  */

  //getUserFavourites(userFavourites);

  //console.log(newArray);

  //console.log(newArray.length);

  var maxEl = 0;

  if(favorites.length > 0) {

  var genres = [];

  //console.log(userFavourites.genres.length);

  console.log(favorites[0].genres[0].name);

  let index = 0;
  for(var i = 0; i < favorites.length; i++) {
      console.log(i);
      //console.log(favorites[i].genres[i].name);
      if(favorites[i].genres) {
          //const hello = 0;
        for(var j = 0; j < favorites[i].genres.length; j++) {
            console.log(i + "" + j);

            console.log(favorites[i].genres[j].name);
            genres[index] = favorites[i].genres[j].name;
            index++;
        }
    }
    else {
        //const hello = 0;
        for(var k = 0; k < favorites[i].genre_ids.length; k++) {
            console.log(i + "" + k);
    
              console.log(favorites[i].genres_ids[k].name);
              genres[index] = favorites[i].genres_ids[k].name;
              index++;
          }
    }
  }

  //genres[0] = "Test";
  //genres[1] = "Test";
  //genres[2] = "Hello";

  console.log(genres);

  var modeMap = {};
  maxEl = genres[0];
  console.log(maxEl);
  var maxCount = 1

  for(let i = 0; i < genres.length; i++) {
      var el = genres[i];
      if(modeMap[el] == null) {
          modeMap[el] = 1;
      }
      else {
          modeMap[el]++;
      }
      if(modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
      }
  }

  console.log(maxEl);
}

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h3" component="h1">
            Analytics
        </Typography>
        <CardContent>
        <Typography variant="h5" component="h1">
            Number of Favourites: {numFavourites}
        </Typography>
        <Typography variant="h5" component="h1">
            Most Liked Genre: {maxEl}
        </Typography>
      </CardContent>
      </CardContent>
    </Card>
  );
}