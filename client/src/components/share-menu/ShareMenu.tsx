import React, { useEffect, useRef } from "react";
import clsx from "clsx";

import useOnClickOutside from "lib/useClickOutside";

import stl from "./ShareMenu.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  setShowShareMenu: (arg: boolean) => void;
}

const ShareMenu = ({ theme, isVisible, setShowShareMenu }: Props) => {
  const [className, setClassName] = React.useState("");

  const ref = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkShareMenu);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const hideMenu = () => {
    setShowShareMenu(false);
  };

  useOnClickOutside(hideMenu, ref);

  const shareOptions = ["Email", "Twitter", "LinkedIn", "Facebook", "Whatsapp"];

  return (
    <div
      ref={ref}
      className={clsx(stl.shareMenu, className, isVisible ? stl.show : "")}
    >
      {shareOptions.map((item, i) => (
        <div key={i} className={stl.item} onClick={hideMenu}>
          <span>via {item}</span>
        </div>
      ))}
    </div>
  );
};

export default ShareMenu;
