import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/auth";
import { NavLink } from "react-router-dom";
import axios from "axios";

const index = (props) => {
  const element = null;
  const token = localStorage.getItem("token");
  console.log(token);
  const data = {
    token: token,
  };
  axios
    .post("api/", data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return (
    <React.Fragment>
      <h1>Welcome to the homepage</h1>
      <button onClick={props.onLogout}>Logout</button>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(index);
