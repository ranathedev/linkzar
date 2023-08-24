import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import { updatePhoto, deletePhoto } from "lib/authFunctions";
import Button from "components/button";
import Spinner from "components/spinner";

import CloseIcon from "assets/close.svg";
import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";

import stl from "./AvatarActions.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  user: any;
  setUser: (arg: any) => void;
  setShowToast: (arg: boolean) => void;
  setToastOpts: (arg: { variant: string; msg: string }) => void;
}

const AvatarActions = ({
  theme,
  isVisible,
  setIsVisible,
  user,
  setUser,
  setShowToast,
  setToastOpts,
}: Props) => {
  const [className, setClassName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkAvatarActions);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const handleUpdatePhoto = async (e: any) => {
    await updatePhoto(e, setUser, setIsLoading, setShowToast, setToastOpts);
  };

  const handleSelectFile = () => {
    const fileInput = document.getElementById("fileInput-2");
    fileInput?.click();
  };

  const handleDelete = async () => {
    await deletePhoto(setUser, setShowToast, setToastOpts);
  };

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
      {isLoading ? (
        <div className={stl.loading}>
          <Spinner taskTitle="" />
        </div>
      ) : (
        <Image
          src={user.photoURL}
          alt="profile-avatar"
          width={240}
          height={240}
        />
      )}
      <div className={stl.btnContainer}>
        <input
          id="fileInput-2"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpdatePhoto}
        />
        <Button
          theme={theme}
          label="Change"
          leftIcon={<EditIcon />}
          handleOnClick={handleSelectFile}
        />
        <Button
          theme={theme}
          label="Delete"
          isDisabled={
            user.photoURL === "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg"
          }
          leftIcon={<DeleteIcon />}
          variant="secondary"
          handleOnClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default AvatarActions;
