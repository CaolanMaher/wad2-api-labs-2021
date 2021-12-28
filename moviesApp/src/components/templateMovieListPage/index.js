import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function MovieListPageTemplate({ movies, title, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("0");
  const genreId = Number(genreFilter);
  const langaugeId = String(languageFilter);
  const sortBy = String(sortFilter);

  console.log(sortBy);
  console.log(languageFilter);

    if(sortBy === "Nothing") {
      // Sort Shows Here

      for(let i = 0; i < movies.length; i++) {
        let min = i;
        for(let j = i + 1; j < movies.length; j++) {
          if(movies[min].id < movies[j].id) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = movies[i];
          movies[i] = movies[min];
          movies[min] = tmp;
        }
      }
    }
    else if(sortBy === "Top Rated") {
      // Sort Shows Here

      for(let i = 0; i < movies.length; i++) {
        let min = i;
        for(let j = i + 1; j < movies.length; j++) {
          if(movies[min].vote_average < movies[j].vote_average) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = movies[i];
          movies[i] = movies[min];
          movies[min] = tmp;
        }
      }
    }
    else if(sortBy === "Least Rated") {
      // Sort Shows Here

      for(let i = 0; i < movies.length; i++) {
        let min = i;
        for(let j = i + 1; j < movies.length; j++) {
          if(movies[min].vote_average > movies[j].vote_average) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = movies[i];
          movies[i] = movies[min];
          movies[min] = tmp;
        }
      }
    }
    else if(sortBy === "Popularity") {
      // Sort Shows Here

      for(let i = 0; i < movies.length; i++) {
        let min = i;
        for(let j = i + 1; j < movies.length; j++) {
          if(movies[min].popularity < movies[j].popularity) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = movies[i];
          movies[i] = movies[min];
          movies[min] = tmp;
        }
      }
    }

  //console.log

  console.log(movies);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if(langaugeId !== "0") {
        return m.original_language.includes(langaugeId);
      }
      else return m;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortFilter(value);
    else setLanguageFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            languageFilter={languageFilter}
            sortFilter={sortFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;