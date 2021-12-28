import React from "react";
import { withRouter } from "react-router-dom";
import PageTemplate from "../components/templateTVShowPage";
import TVShowReview from "../components/tvShowReview";

const TVShowReviewPage = (props) => {
  const {show, review} = props.location.state
  return (
    <PageTemplate show={show}>
      <TVShowReview review={review} />
    </PageTemplate>
  );
};

export default withRouter(TVShowReviewPage);