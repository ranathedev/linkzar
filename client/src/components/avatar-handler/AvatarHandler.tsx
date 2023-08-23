import React, { useEffect } from "react";
import clsx from "clsx";

import { updatePhoto, deletePhoto } from "lib/authFunctions";
import Button from "components/button";
import AvatarContainer from "components/avatar-container";

import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";
import InfoIcon from "assets/info.svg";

import stl from "./AvatarHandler.module.scss";

interface Props {
  theme: string;
  user: any;
  setUser: (arg: any) => void;
  customClass?: string;
}

const AvatarHandler = ({ theme, user, setUser, customClass }: Props) => {
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

  const handleUpdatePhoto = async (e: any) => {
    await updatePhoto(e, setUser);
  };

  const handleSelectFile = () => {
    const fileInput = document.getElementById("file");
    fileInput?.click();
  };

  const handleDelete = async () => {
    await deletePhoto(setUser);
  };

  return (
    <div className={clsx(stl.avatarHandler, className, customClass)}>
      <div className={stl.name}>{user.displayName}</div>
      <AvatarContainer theme={theme} user={user} setUser={setUser} />
      <div className={stl.btnContainer}>
        <input
          id="file"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpdatePhoto}
        />
        <Button
          theme={theme}
          label="Change Avatar"
          leftIcon={<EditIcon />}
          handleOnClick={handleSelectFile}
        />
        <Button
          theme={theme}
          isDisabled={
            user.photoURL === "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg"
          }
          label="Delete Avatar"
          variant="secondary"
          leftIcon={<DeleteIcon />}
          handleOnClick={handleDelete}
        />
      </div>
      <div className={stl.note}>
        <InfoIcon /> Maximum upload size is <b>1 MB</b>.
      </div>
    </div>
  );
};

export default AvatarHandler;
