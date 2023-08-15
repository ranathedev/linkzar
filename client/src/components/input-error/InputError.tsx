import React, { useEffect } from "react";
import clsx from "clsx";

import stl from "./InputError.module.scss";

interface Props {
  error: string;
  theme: string;
}

const InputError = ({ error, theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkInputError);
      } else {
        setClassName("");
      }
    }
  }, [theme]);
  return (
    <div className={clsx(stl.inputError, className)}>
      <span className={error !== "" ? stl.show : ""}>{error}</span>
    </div>
  );
};

InputError.defaultProps = {
  error: "This is an error.",
};

export default InputError;
