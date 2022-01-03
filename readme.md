# Assignment 2 - Web API.

Name: Caolan Maher

## Features.

 + New Routes -> There are new routes now which are used to get the discover page of tv shows and also to 
get details of a specific movie using a parameterized url.
 + Saving Favourite movies and tv shows to the specific user -> Each use has a favourite movie and favourite
tv show array which stores the ID's of the movie or tv show.
 + Analytics -> The favourite movies page contains analytics based on the movies that are tagged as favourites. 
The analytics will show how many movies are in the list, and also what genre comes up the most. It will display 
what the user's favourite genre is.
 + Logging -> There is an app.log file in the api which stores requests made on the api. It will log the day, date, 
time, api request type (e.g GET, POST, PUT, DELETE), and ID if the user requests a specific ID of movie or show.
 + Update User -> Users can update their name and username which will be reflected on the site header when they log in.
 + Display Logged In User's Name -> When registering a user, the user inputs their name, this name is then 
displayed in the header of the site when the user logs in.
 + Pagination -> On the discover movie and discover tv shows page, there is arrows at the bottom for the user 
to load a new page of movies or shows.

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

+ Required: Node, NPM, MongoDB
+ Install and configure mongo, node, npm

```bat
git clone http:\wad2-api-labs-2021.git
```

```bat
Or you can download the zip from my repo if the clone does not work
```

Followed by installation

```bat
npm install
npm i morgan
```

Followed by starting

```bat
*in movies-api folder*
npm start

*in moviesApp folder*
npm start
```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
*This is for the movies-api*

NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
SEED_DB=true
SECRET=YourJWTSecret
TMDB_KEY=YourTMDBKEY

*This is for the moviesApp*

FAST_REFRESH=false;

```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies?page={page} |Gets a page of a list of movies | N/A | N/A | N/A
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A
| /api/movies/{movieid}/images | Get a Movies images | N/A | N/A | N/A
| /api/tmdb/upcoming | Get the upcoming Movies | N/A | N/A | N/A
| /api/tmdb/top_rated | Get the top rated Movies | N/A | N/A | N/A
| /api/genres | Gets a list of movie genres | N/A | N/A | N/A 
| /api/genres/tvshows | Gets a list of tv show genres | N/A | N/A | N/A 
| /api/genres/genres | Gets genre details | N/A | N/A |N/A 
| /api/languages | Gets all languages | N/A | N/A | N/A 
| /api/languages/languages | Gets language details | N/A | N/A | N/A 
| /api/tvshows?page={page} | Gets a page of a list of tv shows | N/A | N/A | N/A 
| /api/tvshows/{tvshowid} | Gets a tv show | N/A | N/A | N/A 
| /api/tvshows/{tvshowid}/reviews | Gets a tv show's reviews | Create a new review for a tv show| N/A | N/A 
| /api/tvshows/{tvshowid}/images | Gets a tv show's images | N/A | N/A | N/A 
| /api/users | Get users | Register or authenticate a user | N/A | N/A 
| /api/{userName} | Get a user's information | N/A | N/A | N/A 
| /api/users/{userid} | N/A | N/A | Update a user's information | N/A 
| /api/{userName}/favourites | Get a user's favourite movies | Add a favourite movie to a user's favourites | N/A | Remove a movie from a user's favourites 
| /api/{userName}/favourites_show | Get a user's favourite shows | Add a favourite show to a user's favourites | N/A | Remove a show from a user's favourites
| ... | ... | ... | ... | ...


## Security and Authentication

 + The API uses passport and JWT tokens to authenticate users
 + User puts in their credentials when logging in
 + If credentials are correct, they are given a JWT token which is stored on the local storage
 + Token is used to authenticate user as long as they are logged in so they do not have to relogin on other pages

The following routes are PrivateRoutes:
 + /tvshows
 + /movies/upcoming
 + /movies/top_rated
 + /reviews/form
 + /update
 + /reviews/:id
 + /tvshowreviews/:id
 + /movies/favorites
 + /tvshows/favorites
 + /movies/playlist
 + /movies/:id
 + /tvshows/:id
 + /

## Integrating with React App

 + I Imported my React App (called moviesApp) into my api-labs folder (not inside my movies-api folder so they are still treated as seperate) so it would be easier to edit it all together so the React App does not have its own repo
 + I changed the tmdb-api.js in the React App to call our own API instead of calling TMDB
 + In our own api, I changed the tmdb-api.js to call TMDB
 + Our own api now acts as a middle man to calling the tmdb-api

###Examples in the tmdb-api.js in the React App

~~~Javascript

export const getMoviesPage = (page = 1) => {
    return fetch(
      '/api/movies?page=' + page
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

*getMoviesPage then calls in /movies/index.js in the api*
router.get('/', asyncHandler(async (req, res) => {
    //const upcomingMovies = await getUpcomingMovies(page);
    //res.status(200).json(upcomingMovies);

    console.info("Getting Movies");

    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)

    const movies = await getMoviesPage(page);

    //const totalDocumentsPromise = movieModel.estimatedDocumentCount(); //Kick off async calls
    //const moviesPromise = movieModel.find().limit(limit).skip((page - 1) * limit);

    //const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    //const movies = await moviesPromise;

    //const returnObject = { page: page, total_pages: Math.ceil(upcomingMovies / limit), total_results: upcomingMovies, results: upcomingMovies };//construct return Object and insert into response object

    res.status(200).json(movies);
}));
*************************

export const getMovie = (args) => {
    //console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    console.info("Here");
    return fetch(
      `/api/movies/${id}`
      ,{headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };

*getMovie then calls in /movies/index.js in the api*
// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {

    //console.info("Get Movie Called");

    const id = parseInt(req.params.id);

    const movieDetails = await getMovie(id);

    //const movie = await movieModel.findByMovieDBId(id);
    if (movieDetails) {
        res.status(200).json(movieDetails);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));
******************************

~~~

###Example in the movie-api.js in the React App

~~~Javascript

export const getUser = (username) => {
    return fetch(
        `/api/users/${username}`
    ).then((response) => {
        if(!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
    });
}

*getUser then calls in users/index in the api*

router.get('/:userName', asyncHandler( async (req, res) => {
    const username = req.params.userName;
    const user = await User.findByUserName(username);
    res.status(200).json(user);
  }));
********************************************

~~~

## Extra features

 + New Routes -> There are new routes now which are used to get the discover page of tv shows and also to 
get details of a specific movie using a parameterized url.
 + Saving Favourite movies and tv shows to the specific user -> Each use has a favourite movie and favourite
tv show array which stores the ID's of the movie or tv show.
 + Analytics -> The favourite movies page contains analytics based on the movies that are tagged as favourites. 
The analytics will show how many movies are in the list, and also what genre comes up the most. It will display 
what the user's favourite genre is.
 + Logging -> There is an app.log file in the api which stores requests made on the api. It will log the day, date, 
time, api request type (e.g GET, POST, PUT, DELETE), and ID if the user requests a specific ID of movie or show. I researched this using this video: https://www.youtube.com/watch?v=aqqM49gc7ME&t=303s
 + Update User -> Users can update their name and username which will be reflected on the site header when they log in.
 + Display Logged In User's Name -> When registering a user, the user inputs their name, this name is then 
displayed in the header of the site when the user logs in.
 + Pagination -> On the discover movie and discover tv shows page, there is arrows at the bottom for the user 
to load a new page of movies or shows.

## Independent learning

 + Analytics -> The favourite movies page contains analytics based on the movies that are tagged as favourites. 
The analytics will show how many movies are in the list, and also what genre comes up the most. It will display 
what the user's favourite genre is.
 + Logging -> There is an app.log file in the api which stores requests made on the api. It will log the day, date, 
time, api request type (e.g GET, POST, PUT, DELETE), and ID if the user requests a specific ID of movie or show. I researched this using this video: https://www.youtube.com/watch?v=aqqM49gc7ME&t=303s
