import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Button from "components/button";

import CloseIcon from "assets/close.svg";
import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";

import stl from "./AvatarActions.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

const AvatarActions = ({ theme, isVisible, setIsVisible }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkAvatarActions);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div
      className={clsx(stl.avatarActions, className, isVisible ? stl.show : "")}
    >
      <div className={stl.header}>
        <div className={stl.title}>Profile picture</div>
        <span className={stl.closeBtn} onClick={() => setIsVisible(false)}>
          <CloseIcon />
        </span>
      </div>
      <Image
        src="https://i.postimg.cc/Mp7gnttP/default-Pic.jpg"
        alt="profile-avatar"
        width={240}
        height={240}
      />
      <div className={stl.btnContainer}>
        <Button theme={theme} label="Change" leftIcon={<EditIcon />} />
        <Button
          theme={theme}
          label="Delete"
          leftIcon={<DeleteIcon />}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default AvatarActions;
