import React, { useEffect } from "react";
import clsx from "clsx";

import stl from "./PlusMinus.module.scss";

interface Props {
  handleOnClick: () => void;
  isActive: Boolean;
  theme: string;
}

const PlusMinusIcon = ({ handleOnClick, isActive, theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkBtn);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div
      className={clsx(stl.btn, isActive ? stl.active : "", className)}
      onClick={handleOnClick}
    />
  );
};

export default PlusMinusIcon;
