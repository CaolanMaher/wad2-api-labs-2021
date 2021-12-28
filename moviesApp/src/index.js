import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import { BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PlaylistMoviesPage from "./pages/playlistMoviesPage"; // NEW
import TopRatedMoviePage from "./pages/topRatedMoviesPage"; // NEW FOR ASSIGNMENT
import TVShowsPage from "./pages/tvShowsPage"; // NEW FOR ASSIGNMENT
import TVShowReviewPage from "./pages/tvShowReviewPage"; // NEW FOR ASSIGNMENT
import TVShowDetailsPage from "./pages/tvShowDetailsPage"; // NEW FOR ASSIGNMENT
import FavoriteTVShowsPage from "./pages/favoriteTVShowPage"; // NEW FOR ASSIGNMENT
import LoginPage from "./pages/loginPage";
import PrivateRoute from "./components/privateRoute";
import BaseAuthHeader from "./components/authHeader";
import AuthContextProvider from "./contexts/authContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <BaseAuthHeader />
          <MoviesContextProvider>
            {" "}
            <Switch>
              <PrivateRoute exact path="/tvshows" component={TVShowsPage} /> 
              <PrivateRoute exact path="/movies/upcoming" component={UpcomingMoviesPage} />
              <PrivateRoute exact path="/movies/top_rated" component={TopRatedMoviePage} />
              <PrivateRoute exact path="/reviews/form" component={AddMovieReviewPage} />
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/reviews/:id" component={MovieReviewPage} />
              <PrivateRoute path="/tvshowreviews/:id" component={TVShowReviewPage} />
              <PrivateRoute exact path="/movies/favorites" component={FavoriteMoviesPage} />
              <PrivateRoute exact path="/tvshows/favorites" component={FavoriteTVShowsPage} />
              <PrivateRoute exact path="/movies/playlist" component={PlaylistMoviesPage} />
              <PrivateRoute path="/movies/:id" component={MoviePage} />
              <PrivateRoute path="/tvshows/:id" component={TVShowDetailsPage} />
              <PrivateRoute exact path="/" component={HomePage} />
              <Redirect from="*" to="/" />
            </Switch>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));