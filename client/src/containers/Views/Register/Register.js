import React, { useState } from "react";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const Register = (props) => {
  const [registerForm, setRegisterForm] = useState({
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
    gender: {
      elementType: "select",
      elementConfig: {
        type: "select",
        options: [
          { value: "Male", displayValue: "Male" },
          { value: "Female", displayValue: "Female" },
        ],
      },
      value: "Male",
    },
  });

  const formElementsArray = [];
  for (let key in registerForm) {
    formElementsArray.push({
      key: key,
      config: registerForm[key],
    });
  }

  const inputHandler = (event, inputIdentifier) => {
    const updatedFormElement = {
      ...registerForm[inputIdentifier],
      value: event.target.value,
    };

    const updatedRegisterForm = {
      ...registerForm,
      [inputIdentifier]: updatedFormElement,
    };

    setRegisterForm(updatedRegisterForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const inputData = {
      username: registerForm.name.value,
      password: registerForm.password.value,
      gender: registerForm.gender.value,
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
    onAuth: (data, type) => dispatch(actions.auth(data, "register")),
  };
};

export default connect(null, mapDispatchToProps)(Register);
