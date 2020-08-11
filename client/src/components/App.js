import React, { useEffect, Suspense } from "react";
import LandingPage from "../containers/Views/LandingPage/LandingPage";

import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "../containers/Views/Login/Login";
import Index from "../containers/Views/Index/index";
import Register from "../containers/Views/Register/Register";
import UploadProductPage from "../containers/Views/UploadProductPage/UploadProductPage";
import * as actions from "../store/actions/auth";
import DetailProductPage from "../containers/Views/DetailProductPage/DetailProductPage";
import Auth from "../hoc/auth";
import RegisterPage from "../containers/Views/RegisterPage/RegisterPage";
import LoginPage from "../containers/Views/LoginPage/LoginPage";
import NavBar from "../containers/Views/NavBar/NavBar";
import CartPage from "../containers/Views/CartPage/CartPage";

const App = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route
            path="/product/upload"
            component={Auth(UploadProductPage, true)}
          />
          <Route
            path="/product/:productId"
            component={Auth(DetailProductPage, null)}
          />
          <Route path="/user/cart" component={Auth(CartPage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
};

export default App;
