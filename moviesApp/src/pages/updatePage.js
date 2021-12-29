import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

const UpdatePage = props => {
  const context = useContext(AuthContext)
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  //const [password, setPassword] = useState("");
  //const [passwordAgain, setPasswordAgain] = useState("");
  const [updated, setUpdated] = useState(false);

  const update = () => {
    //if (password.length > 0 && password === passwordAgain) {
      console.log(context.user._id);
      context.update(name, userName, context.user._id);
      setUpdated(true);
    //}
  }

  //const { from } = props.location.state || { from: { pathname: "/" } };

  if (updated === true) {
    return <Redirect to="./login" />;
  }

  return (
    <>
      <h2>Update page</h2>
      <p>You can update your name, username and password here </p>
      <input value={name} placeholder="name" onChange={e => {
        setName(e.target.value);
      }}></input><br />
      <input value={userName} placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      {/* Login web form  */}
      <button onClick={update}>Update</button>
    </>
  );
};

export default UpdatePage;