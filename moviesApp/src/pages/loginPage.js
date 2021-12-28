/*
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import TextField from "@material-ui/core/TextField";
import useForm from "react-hook-form";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import users from "../components/users";

const LoginPage = (props) => {
  const context = useContext(AuthContext);

  const { register, handleSubmit} = useForm();
  const [open, setOpen] = React.useState(false);

  const onSubmit = (appUser) => {

    if(users.some(user => user.username === appUser.username && user.password === appUser.password)) {
        context.authenticate(appUser.username, appUser.password);
    }
    else {
        setOpen(true);
    }
  };

  const handleSnackClose = (event) => {
    setOpen(false);
};

  // Set 'from' to the path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  const { from } = props.location.state || { from: { pathname: "/" } };

  return context.isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      <Snackbar
        //className={classes.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
        >
          <MuiAlert
            severity="error"
            variant="filled"
            onClose={handleSnackClose}
            >
                <Typography variant="h4">
                    Incorrect Username or Password
                </Typography>
            </MuiAlert>
        </Snackbar>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
      <TextField
          variant="outlined"
          margin="normal"
          required
          id="username"
          label="Username"
          name="username"
          autoFocus
          inputRef={register({ required: "Username required" })}
        />
        <br></br>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="password"
          label="Password"
          name="password"
          autoFocus
          inputRef={register({ required: "Password required" })}
        />
        <br></br>
        <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
    </>
  );
};

export default LoginPage;

*/

import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const LoginPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(userName, password);
  };

  // Set 'from' to path where browser is redirected after a successful login.
  // Either / or the protected path user tried to access.
  const { from } = props.location.state || { from: { pathname: "/" } };

  if (context.isAuthenticated === true) {
    return <Redirect to={from} />;
  }
  return (
    <>
      <h2>Login page</h2>
      <p>You must log in to view the protected pages </p>
      <input id="username" placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input id="password" type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      {/* Login web form  */}
      <button onClick={login}>Log in</button>
      <p>Not Registered?
      <Link to="/signup">Sign Up!</Link></p>
    </>
  );
};

export default LoginPage;