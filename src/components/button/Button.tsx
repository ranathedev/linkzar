import React from "react";
import clsx from "clsx";

import stl from "./Button.module.scss";

interface Props {
  label: string;
  variant: string;
  icon?: React.ReactNode;
  theme: string;
  handleOnClick: () => void;
}

const Button = ({ label, variant, icon, theme, handleOnClick }: Props) => {
  return (
    <button
      className={clsx(
        stl.btn,
        stl[`${variant}Btn`],
        stl[`${theme}${variant}Btn`]
      )}
      onClick={handleOnClick}
    >
      {label}
      {icon}
    </button>
  );
};

Button.defaultProps = {
  label: "Button",
  variant: "primary",
  handleOnClick: () => console.log("Clicked..."),
};

export default Button;
