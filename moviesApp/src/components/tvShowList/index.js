import React from "react";
import Show from "../tvShowCard";
import Grid from "@material-ui/core/Grid";

const TVShowList = ( {shows, action }) => {
  let tvShowCards = shows.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Show key={m.id} show={m} action={action} />
    </Grid>
  ));
  return tvShowCards;
};

export default TVShowList;