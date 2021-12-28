import React from "react";
import TVShowHeader from "../components/headerTVShow";
import SampleTVShow from "./sampleTVShows";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";

export default {
  title: "TV Show Details Page/TVShowHeader",
  component: TVShowHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <TVShowHeader show={SampleTVShow} />;

Basic.storyName = "Default";
