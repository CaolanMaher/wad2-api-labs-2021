import React, { useState } from "react";
import Header from "../headerTVShowList";
import FilterCard from "../filterTVShowsCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TVShowList from "../tvShowList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function TVShowListPageTemplate({ shows, name, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [languageFilter, setLanguageFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("0");
  const genreId = Number(genreFilter);
  const languageId = String(languageFilter);
  const sortBy = String(sortFilter);

  console.log(sortBy);
  console.log(languageFilter);

    if(sortBy === "Nothing") {
      // Sort Shows Here

      for(let i = 0; i < shows.length; i++) {
        let min = i;
        for(let j = i + 1; j < shows.length; j++) {
          if(shows[min].id < shows[j].id) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = shows[i];
          shows[i] = shows[min];
          shows[min] = tmp;
        }
      }
    }
    else if(sortBy === "Top Rated") {
      // Sort Shows Here

      for(let i = 0; i < shows.length; i++) {
        let min = i;
        for(let j = i + 1; j < shows.length; j++) {
          if(shows[min].vote_average < shows[j].vote_average) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = shows[i];
          shows[i] = shows[min];
          shows[min] = tmp;
        }
      }
    }
    else if(sortBy === "Least Rated") {
      // Sort Shows Here

      for(let i = 0; i < shows.length; i++) {
        let min = i;
        for(let j = i + 1; j < shows.length; j++) {
          if(shows[min].vote_average > shows[j].vote_average) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = shows[i];
          shows[i] = shows[min];
          shows[min] = tmp;
        }
      }
    }
    else if(sortBy === "Popularity") {
      // Sort Shows Here

      for(let i = 0; i < shows.length; i++) {
        let min = i;
        for(let j = i + 1; j < shows.length; j++) {
          if(shows[min].popularity < shows[j].popularity) {
            min = j;
          }
        }
        if(min !== i) {
          let tmp = shows[i];
          shows[i] = shows[min];
          shows[min] = tmp;
        }
      }
    }

  //console.log

  console.log(shows);

  let displayedTVShows = shows
    .filter((m) => {
      return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      if(languageId !== "0") {
        return m.original_language.includes(languageId);
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
        <Header name={name} />
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
        <TVShowList action={action} shows={displayedTVShows}></TVShowList>
      </Grid>
    </Grid>
  );
}
export default TVShowListPageTemplate;