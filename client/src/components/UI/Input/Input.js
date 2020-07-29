import React from "react";

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "password":
      inputElement = (
        <input
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
        />
      );
    case "text":
      inputElement = (
        <input
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          value={props.value}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select onChange={props.changed}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input {...props.elementConfig} />;
  }

  return inputElement;
};

export default input;
