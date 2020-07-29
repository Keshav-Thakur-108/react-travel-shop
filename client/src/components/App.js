import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Login from "../containers/Views/Login/Login";
import Index from "../containers/Views/Index/index";
import Register from "../containers/Views/Register/Register";
import * as actions from "../store/actions/auth";

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
