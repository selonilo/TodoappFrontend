import React from "react";
import { InputText } from "primereact/inputtext";

export default function Input(props) {
  const {
    errorText,
    label,
    value,
    onChange,
    name,
    leftIcon,
    autoFocus,
    ref,
    onKeyPress,
    type,
    placeholder,
    maxLength,
    keyfilter,
  } = props;

  return (
    <div>
      <label className="block my-2">{label}</label>
      <span className={leftIcon && "p-input-icon-left"}>
        <i className={`pi pi-${leftIcon}`} />
        <InputText
          maxLength={maxLength}
          keyfilter={keyfilter}
          placeholder={placeholder}
          type={type}
          onKeyPress={onKeyPress}
          ref={ref}
          autoFocus={autoFocus}
          style={{ width: "100%" }}
          name={name}
          className={errorText && "p-invalid"}
          value={value}
          onChange={onChange}
        />
      </span>
      {errorText && <small className="p-error block py-1">{errorText}</small>}
    </div>
  );
}
