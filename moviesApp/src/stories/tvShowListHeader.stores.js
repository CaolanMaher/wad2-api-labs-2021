import React from "react";
import TVShowListHeader from "../components/headerTVShowList";

export default {
  title: "TV Shows Page/Header",
  component: TVShowListHeader,
};

export const Basic = () => <TVShowListHeader name={'Discover TV Shows'} />;

Basic.storyName = "Default";