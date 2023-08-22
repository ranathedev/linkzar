import React from "react";
import Image from "next/image";
import clsx from "clsx";

import Modal from "components/modal";
import AvatarActions from "components/avatar-actions";

import CameraIcon from "assets/camera.svg";

import stl from "./AvatarContainer.module.scss";

interface Props {
  theme: string;
  customClass?: string;
}

const AvatarContainer = ({ theme, customClass }: Props) => {
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
          />
        }
      />
      <div
        className={clsx(stl.avatarContainer, customClass)}
        onClick={() => setShowModal(true)}
      >
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
    </>
  );
};

export default AvatarContainer;
