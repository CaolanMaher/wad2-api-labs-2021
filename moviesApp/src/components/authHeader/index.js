import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
//import { makeStyles } from "@material-ui/core/styles";
//import AppBar from "@material-ui/core/AppBar";
//import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

const BaseAuthHeader = (props) => {
  const context = useContext(AuthContext);
  const { history } = props;

  const name = context.user.name;

  //console.info(context.name);

  return context.isAuthenticated ? (
    <Paper elevation={4}>
    <Typography variant="h4" component="h3">
        Welcome {name}! <button onClick={() => context.signout()}>Sign out</button>
    </Typography>
    <p><Link to="/update">Update Your Credentials!</Link></p>
    </Paper>
    ) : (
    <Paper elevation={4}>
    <Typography variant="h4" component="h3">
        You are not logged in{" "}
        <button onClick={() => history.push("/login")}>Login</button>
    </Typography>
    </Paper>
  );
};

export default withRouter(BaseAuthHeader);
