import React, { useEffect } from "react";
import clsx from "clsx";

import stl from "./Button.module.scss";

interface Props {
  label: string;
  variant: string;
  icon?: React.ReactNode;
  theme: string;
  type: "button" | "submit" | "reset";
  isDisabled: boolean;
  handleOnClick: () => void;
}

const Button = ({
  label,
  variant,
  icon,
  theme,
  type,
  isDisabled,
  handleOnClick,
}: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl[`dark${variant}Btn`]);
      } else {
        setClassName("");
      }
    }
  }, [theme, variant]);

  return (
    <button
      disabled={isDisabled}
      className={clsx(stl.btn, stl[`${variant}Btn`], className)}
      onClick={handleOnClick}
      type={type}
    >
      <span>{label}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

Button.defaultProps = {
  label: "Button",
  variant: "primary",
  type: "button",
  isDisabled: false,
  handleOnClick: () => console.log("Clicked..."),
};

export default Button;
