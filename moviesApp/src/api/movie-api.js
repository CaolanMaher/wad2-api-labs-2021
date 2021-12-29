export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (name, username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ name:name, username: username, password: password })
    }).then(res => res.json())
};

export const updateUser = (name, username, id) => {
    return fetch(`/api/users/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({ name: name, username: username })
    }).then(res => res.json())
};

export const addFavouriteMovie = (userName, id) => {
    return fetch(`/api/users/${userName}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ userName: userName, id: id })
    }).then(res => res.json())
};

export const removeFavouriteMovie = (userName, id) => {
    return fetch(`/api/users/${userName}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify({ userName: userName, id: id })
    }).then(res => res.json())
};

export const getFavouriteMovies = (username) => {
    console.log(username);
    return fetch(
        `/api/users/${username}/favourites`
    ).then((response) => {
        if(!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
    });
};

export const addFavouriteTVShow = (userName, id) => {
    return fetch(`/api/users/${userName}/favourites_show`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ userName: userName, id: id })
    }).then(res => res.json())
};

export const removeFavouriteTVShow = (userName, id) => {
    return fetch(`/api/users/${userName}/favourites_show`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete',
        body: JSON.stringify({ userName: userName, id: id })
    }).then(res => res.json())
};

export const getFavouriteTVShows = (username) => {
    return fetch(
        `/api/users/${username}/favourites_show`
    ).then((response) => {
        if(!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
    .catch((error) => {
        throw error
    });
};

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



/*
export const getMovies = () => {
    return fetch(
       '/api/movies',{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
  */