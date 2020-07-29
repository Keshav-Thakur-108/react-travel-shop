import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  console.log("dispatch is working");
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFail = () => {
  return actionTypes.AUTH_FAIL;
};

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: id,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const auth = (data, type) => {
  return (dispatch) => {
    dispatch(authStart());
    const userData = data;
    let url = (type = "login") ? "api/login" : "api/register";
    axios
      .post(url, userData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.userId);
        dispatch(authSuccess(res.data.token, res.data.userId));
      })
      .catch((err) => console.log(err.message));
  };
};
