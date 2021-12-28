/*
export const getMovies = () => {
    return fetch(
      //`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
      '/api/movies',{headers: {
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

  export const getMoviesPage = (page = 0) => {
    return fetch(
      //`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=` + page
      '/api/movies?page=' + page + '&limit=5'
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
  
  export const getMovie = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    console.info("Here");
    return fetch(
      //`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}`
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
  
  export const getGenres = async () => {
    return fetch(
      //"https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      //  process.env.REACT_APP_TMDB_KEY +
      //  "&language=en-US"
      `/api/genres`
    ).then(res => res.json());
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      //`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/images`
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

  export const getMovieReviews = (id) => {
    console.info("Calling Movie Reviews");

    return fetch(
      //`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
      `/api/movies/${id}/reviews`
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
  };

  export const getUpcomingMovies = () => {
      return fetch(
          //`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
          '/api/movies/tmdb/upcoming'
          ,{headers: {
            'Authorization': window.localStorage.getItem('token')
          }
        }
      ).then(res => res.json());
  };

  export const getUpcomingMoviesPage = (page = 0) => {
    return fetch(
        //`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        '/api/movies/tmdb/upcoming?page=' + page
        ,{headers: {
          'Authorization': window.localStorage.getItem('token')
        }
      }
    ).then(res => res.json());
};

  // New Endpoints For Assignment

  export const getTopRatedMovies = () => {
    return fetch(
      //`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      '/api/movies/tmdb/top_rated'
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

  /*
  export const getTVShows = () => {
    return fetch(
      //`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_KEY}`
      '/api/tvshows'
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
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
  */

  export const getTVShowsPage = (page = 1) => {

    console.info("Starting TVSHOWS Page");

    return fetch(
        //`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
        '/api/tvshows?page=' + page
        ,{headers: {
          'Authorization': window.localStorage.getItem('token')
        }
      }
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

  export const getTVShowImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

  export const getTVShowGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
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

  export const getTVShowReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getTVShow = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

  export const getTVShowLanguages = async () => {
    return fetch(
      "https://api.themoviedb.org/3/configuration/languages?api_key=" +
        process.env.REACT_APP_TMDB_KEY
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

  export const getMovieLanguages = async () => {
    return fetch(
      "https://api.themoviedb.org/3/configuration/languages?api_key=" +
        process.env.REACT_APP_TMDB_KEY
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