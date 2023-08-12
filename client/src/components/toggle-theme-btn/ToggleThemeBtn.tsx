import React, { useEffect } from "react";
import clsx from "clsx";

import SunIcon from "assets/sun.svg";
import MoonIcon from "assets/moon.svg";

import stl from "./ToggleThemeBtn.module.scss";

interface Props {
  handleOnClick: any;
  theme: string;
  customClass?: string;
}

const ToggleThemeBtn = ({ handleOnClick, theme, customClass }: Props) => {
  const [isNoticed, setIsNoticed] = React.useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const btn = document.getElementById("toggleBtn");
      const dot = document.getElementById("dotBtn");
      if (theme === "dark") {
        btn?.classList.add(stl.activeBtn);
        dot?.classList.add(stl.active);
      } else {
        btn?.classList.remove(stl.activeBtn);
        dot?.classList.remove(stl.active);
      }
    }
  }, [theme]);

  useEffect(() => {
    handleHideBtn();
  }, []);

  const handleHideBtn = () => {
    setTimeout(() => {
      setIsNoticed(false);
    }, 500);
  };

  return (
    <div
      onMouseEnter={() => setIsNoticed(true)}
      onMouseLeave={handleHideBtn}
      title="Toggle Theme"
      className={clsx(stl.toggleBtn, customClass, isNoticed ? "" : stl.hideBtn)}
      onClick={() => {
        handleOnClick();
      }}
    >
      <div id="toggleBtn" className={stl.iconContainer}>
        <MoonIcon />
        <SunIcon />
      </div>
      <span id="dotBtn" className={stl.dotBtn} />
    </div>
  );
};

export default ToggleThemeBtn;
