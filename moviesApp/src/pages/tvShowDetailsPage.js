import React from "react";
import { withRouter } from "react-router-dom";
import TVShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTVShowPage";
//import useMovie from "../hooks/useMovie";
import { getTVShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const TVShowDetailsPage = (props) => {
  const { id } = props.match.params;

  const { data: show, error, isLoading, isError } = useQuery(
    ["tvShow", { id: id }],
    getTVShow
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {show ? (
        <>
          <PageTemplate show={show}>
            <TVShowDetails show={show} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default withRouter(TVShowDetailsPage);