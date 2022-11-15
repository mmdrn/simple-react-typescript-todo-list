import React, { FC /* , useState */ } from "react";
import "./style.scss";

interface FormControlProps {
  title?: String;
  data?: Object;
  key?: String;
  placeholder?: String;
  onHandleChange?: Function;
  onKeyDown?: Function;
}

const FormControl: FC<FormControlProps> = (props: any) => {
  const handleChange = (value: any, key: string) => {
    props.onHandleChange(value, key);
  };

  const validationComponent = (key: string) => {
    return (
      <div className="validations">
        {props.data.errors.map((error: any) => (
          <p
            key={props.data.key}
            className="validation-item"
            dangerouslySetInnerHTML={{ __html: error }}
          />
        ))}
      </div>
    );
  };

  const inputComponent = () => {
    if (props.data.inputType !== "file") {
      return (
        <input
          type={props.data.inputType}
          id={props.data.key}
          className="control"
          autoComplete="off"
          onChange={(e) => handleChange(e.target.value, props.data.key)}
          value={props.data.value}
          placeholder={props.placeholder}
          onKeyDown={props.onKeyDown ? props.onKeyDown : undefined}
        />
      );
    } else {
      return (
        <label className="file-selector-wrapper">
          <label className="selector" htmlFor={props.data.key}>
            Select
          </label>
          <span className="file-name">{props.data.value.name}</span>
          <input
            type={props.data.inputType}
            id={props.data.key}
            className="control"
            autoComplete="off"
            accept={props.data.accept}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e?.target?.files) {
                handleChange(e.target.files[0], props.data.key);
              }
            }}
          />
        </label>
      );
    }
  };

  return (
    <div
      className={`form-control ${
        props.data.errors.length > 0 ? "has-error" : ""
      }
        ${props.data.inputType === "file" ? "file" : ""}
      `}
      key={props.data.key}
    >
      {validationComponent(props.data.key)}
      {inputComponent()}
      <label htmlFor={props.data.key} className="control-title">
        {props.title}
      </label>
    </div>
  );
};

export default FormControl;
