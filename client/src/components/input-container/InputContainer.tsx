import React, { useEffect } from "react";
import { Field } from "formik";
import clsx from "clsx";

import stl from "./InputContainer.module.scss";

interface Props {
  label: string;
  id: string;
  placeholder: string;
  type: string;
  required: boolean;
  theme: string;
}

const InputContainer = ({
  label,
  id,
  placeholder,
  type,
  required,
  theme,
}: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkInputContainer);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.inputContainer, className)}>
      <label htmlFor={id}>{label}</label>
      <Field
        type={type}
        name={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

InputContainer.defaultProps = {
  label: "First name",
  id: "fname",
  placeholder: "",
  type: "text",
};

export default InputContainer;
