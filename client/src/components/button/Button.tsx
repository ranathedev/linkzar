import React, { useEffect } from "react";
import clsx from "clsx";

import stl from "./Button.module.scss";

interface Props {
  label: string;
  variant: string;
  icon?: React.ReactNode;
  theme: string;
  type: "button" | "submit" | "reset";
  handleOnClick: () => void;
}

const Button = ({
  label,
  variant,
  icon,
  theme,
  type,
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
      className={clsx(stl.btn, stl[`${variant}Btn`], className)}
      onClick={handleOnClick}
      type={type}
    >
      {label}
      {icon}
    </button>
  );
};

Button.defaultProps = {
  label: "Button",
  variant: "primary",
  type: "button",
  handleOnClick: () => console.log("Clicked..."),
};

export default Button;
