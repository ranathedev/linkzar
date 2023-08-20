import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import Button from "components/button";
import Modal from "components/modal";
import AvatarActions from "components/avatar-actions";

import EditIcon from "assets/edit.svg";
import DeleteIcon from "assets/delete.svg";
import CameraIcon from "assets/camera.svg";
import InfoIcon from "assets/info.svg";

import stl from "./AvatarHandler.module.scss";

interface Props {
  theme: string;
}

const AvatarHandler = ({ theme }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
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
    <>
      <Modal
        theme={theme}
        isVisible={showModal}
        dialog={
          <AvatarActions
            theme={theme}
            isVisible={showModal}
            setIsVisible={setShowModal}
          />
        }
      />
      <div className={clsx(stl.avatarHandler, className)}>
        <div className={stl.name}>Rao Intizar</div>
        <div className={stl.imgContainer} onClick={() => setShowModal(true)}>
          <Image
            src="https://i.postimg.cc/Mp7gnttP/default-Pic.jpg"
            alt="profile-avatar"
            width={240}
            height={240}
          />
          <div>
            <CameraIcon />
          </div>
        </div>
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
    </>
  );
};

export default AvatarHandler;
