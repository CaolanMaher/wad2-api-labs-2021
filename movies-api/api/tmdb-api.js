import fetch from 'node-fetch';

/*
export const getMoviesPage = (page = 0) => {
    return fetch(
      //`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=` + page
      '/api/movies?page=' + page + '&limit=5'
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };
  */

  export const getMovie = (id) => {
    //console.log(args)
    //const [, idPart] = args.queryKey;
    //const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getUpcomingMovies = (page = 0) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=` + page
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieImages = (id) => {
    //const [, idPart] = queryKey;
    //const { id } = idPart;

    console.info("Fetching Movie Images");

    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
      //`/api/movies/${id}/images`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = (id) => {

    console.info("Fetching Movie Reviews");

    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
      //`/api/movies/${id}/reviews`
      ).then((response) => {
        if(!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
      })
  };

  export const getTopRatedMovies = () => {

    console.info("Fetching Top Rated");

    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      //'/api/movies/tmdb/top_rated'
    )
    .then((response) => {
      if(!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
    })
  };

  export const getTVShowsPage = (page = 1) => {

    console.info("Fetching TVSHOWS");

    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&page=` + page
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
  };

  export const getTVShowImages = (id) => {
    //const [, idPart] = queryKey;
    //const { id } = idPart;

    console.info("Fetching TVShow Images");

    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_KEY}`
      //`/api/movies/${id}/images`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getTVShow = (id) => {
    //console.log(args)
    //const [, idPart] = args.queryKey;
    //const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getTVShowReviews = (id) => {

    console.info("Fetching Movie Reviews");

    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.TMDB_KEY}`
      //`/api/movies/${id}/reviews`
      ).then((response) => {
        if(!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
      })
  };

  export const getLanguages = async () => {
    return fetch(
      "https://api.themoviedb.org/3/configuration/languages?api_key=" +
        process.env.TMDB_KEY
      //'/api/languages'
    ).then(res => res.json());
  };