/*
import React, { useState, createContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [user, setUser] = useState({ username: null, password: null });

  const authenticate = (username, password) => {
        setUser({ username, password });
  };

  const isAuthenticated = user.username === null ? false : true

  const signout = () => {
    setTimeout(() => setUser( { username: null, password: null } ), 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

*/

import React, { useState, createContext } from "react";
import { login, signup, addFavouriteMovie, getFavouriteMovies, getUser, removeFavouriteMovie, updateUser} from ".././api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  //const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [favorites, setFavorites] = useState( [] );
  const [user, setCurrentUser] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    //user = getUser(username);
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      //setName(name);
      setUserName(username);
      setFavorites(await getFavouriteMovies(username));
      setCurrentUser(await getUser(username));
    }
  };

  const update = async (name, username, id) => {
    const result = await updateUser(name, username, id);
    console.log(result.code);
    signout();
    return (result.code === 201) ? true : false;
  };

  const addToFavorites = async (movie) => {

    //console.log(movie._id);
    //console.log(movie);

    if(!favorites.includes(movie)) {
      setFavorites([...favorites, movie]);
      //setFavorites([...favorites]);
      addFavouriteMovie(userName,movie.id);
      //setFavorites(await getFavouriteMovies(userName));
    }
  }

  const removeFromFavorites = async (movie) => {
    if(favorites.includes(movie)) {
      //setFavorites([...favorites,movie])

      const index = favorites.indexOf(movie);
      favorites.splice(index, 1);

      removeFavouriteMovie(userName,movie.id);

      setFavorites([...favorites]);
      //setFavorites(await getFavouriteMovies(userName));
    }
  }

  const register = async (name, username, password) => {
    const result = await signup(name, username, password);
    console.log(result.code);
    return (result.code === 201) ? true : false;
  };

  const signout = () => {
    //console.log("Signed Out");
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        //name,
        userName,
        addToFavorites,
        removeFromFavorites,
        favorites,
        getUser,
        user,
        update
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;