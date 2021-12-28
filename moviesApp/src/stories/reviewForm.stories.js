import React from "react";
import ReviewForm from "../components/reviewForm";
import { MemoryRouter } from "react-router";

export default {
    title: "Review Form/ReviewForm",
    component: ReviewForm,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    ],
  };

  export const Basic = () => <ReviewForm />;

Basic.storyName = "Default";