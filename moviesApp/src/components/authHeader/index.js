import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";
//import AppBar from "@material-ui/core/AppBar";
//import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

const BaseAuthHeader = (props) => {
  const context = useContext(AuthContext);
  const { history } = props;

  return context.isAuthenticated ? (
    <Paper elevation={4}>
    <Typography variant="h4" component="h3">
        Welcome! <button onClick={() => context.signout()}>Sign out</button>
    </Typography>
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
