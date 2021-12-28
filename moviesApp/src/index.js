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
              <Route exact path="/tvshows" component={TVShowsPage} /> 
              <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
              <Route exact path="/movies/top_rated" component={TopRatedMoviePage} />
              <Route exact path="/reviews/form" component={AddMovieReviewPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/reviews/:id" component={MovieReviewPage} />
              <Route path="/tvshowreviews/:id" component={TVShowReviewPage} />
              <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
              <Route exact path="/tvshows/favorites" component={FavoriteTVShowsPage} />
              <Route exact path="/movies/playlist" component={PlaylistMoviesPage} />
              <Route path="/movies/:id" component={MoviePage} />
              <Route path="/tvshows/:id" component={TVShowDetailsPage} />
              <Route exact path="/" component={HomePage} />
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