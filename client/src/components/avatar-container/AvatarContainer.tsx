import React from "react";
import Image from "next/image";
import clsx from "clsx";

import Modal from "components/modal";
import AvatarActions from "components/avatar-actions";

import CameraIcon from "assets/camera.svg";

import stl from "./AvatarContainer.module.scss";

interface Props {
  theme: string;
  user: any;
  setUser: (arg: any) => void;
  setShowToast: (arg: boolean) => void;
  setToastOpts: (arg: { variant: string; msg: string }) => void;
  customClass?: string;
}

const AvatarContainer = ({
  theme,
  user,
  setUser,
  setShowToast,
  setToastOpts,
  customClass,
}: Props) => {
  const [showModal, setShowModal] = React.useState(false);

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
            user={user}
            setUser={setUser}
            setShowToast={setShowToast}
            setToastOpts={setToastOpts}
          />
        }
      />
      <div
        className={clsx(stl.avatarContainer, customClass)}
        onClick={() => setShowModal(true)}
      >
        <Image
          src={user.photoURL}
          alt="profile-avatar"
          width={500}
          height={500}
        />
        <div>
          <CameraIcon />
        </div>
      </div>
    </>
  );
};

export default AvatarContainer;
