import React, { useEffect } from "react";
import clsx from "clsx";

import Button from "components/button";
import AvatarContainer from "components/avatar-container";

import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";
import InfoIcon from "assets/info.svg";

import stl from "./AvatarHandler.module.scss";

interface Props {
  theme: string;
  customClass?: string;
}

const AvatarHandler = ({ theme, customClass }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkAvatarHandler);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.avatarHandler, className, customClass)}>
      <div className={stl.name}>Rao Intizar</div>
      <AvatarContainer theme={theme} />
      <div className={stl.btnContainer}>
        <Button theme={theme} label="Change Avatar" leftIcon={<EditIcon />} />
        <Button
          theme={theme}
          label="Delete Avatar"
          variant="secondary"
          leftIcon={<DeleteIcon />}
        />
      </div>
      <div className={stl.note}>
        <InfoIcon /> Maximum upload size is <b>1 MB</b>.
      </div>
    </div>
  );
};

export default AvatarHandler;
