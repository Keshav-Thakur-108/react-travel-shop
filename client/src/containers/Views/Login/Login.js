import React, { useState } from "react";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const Login = (props) => {
  const [loginForm, setLoginForm] = useState({
    name: {
      elementType: "text",
      elementConfig: {
        type: "text",
        placeholder: "Enter your name",
      },
      value: "",
    },
    password: {
      elementType: "password",
      elementConfig: {
        type: "password",
        placeholder: "Enter your password",
      },
      value: "",
    },
  });

  const formElementsArray = [];
  for (let key in loginForm) {
    formElementsArray.push({
      key: key,
      config: loginForm[key],
    });
  }

  const inputHandler = (event, inputIdentifier) => {
    const updatedFormElement = {
      ...loginForm[inputIdentifier],
      value: event.target.value,
    };

    const updatedLoginForm = {
      ...loginForm,
      [inputIdentifier]: updatedFormElement,
    };

    setLoginForm(updatedLoginForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const inputData = {
      username: loginForm.name.value,
      password: loginForm.password.value,
    };
    console.log("Submit Handler Working");
    props.onAuth(inputData);
  };

  let form = (
    <form onSubmit={submitHandler}>
      {formElementsArray.map((element) => (
        <Input
          key={element.key}
          changed={(e) => inputHandler(e, element.key)}
          value={element.config.value}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
        />
      ))}
      <button>Submit</button>
    </form>
  );

  return form;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (data, type) => dispatch(actions.auth(data, "login")),
  };
};

export default connect(null, mapDispatchToProps)(Login);
