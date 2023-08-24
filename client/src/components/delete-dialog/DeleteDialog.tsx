import React, { useEffect } from "react";
import clsx from "clsx";

import Button from "components/button";

import stl from "./DeleteDialog.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  msg: string;
  handleDelete: () => void;
  handleCancel: () => void;
}

const DeleteDialog = ({
  theme,
  isVisible,
  msg,
  handleDelete,
  handleCancel,
}: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkDelDialog);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <div className={clsx(stl.delDialog, isVisible ? stl.show : "", className)}>
      <span>Are you sure you want to delete {msg}</span>
      <div className={stl.btnContainer}>
        <Button
          variant="secondary"
          theme={theme}
          label="Cancel"
          handleOnClick={handleCancel}
        />
        <Button
          theme={theme}
          label="Yes, Delete"
          handleOnClick={handleDelete}
        />
      </div>
    </div>
  );
};

DeleteDialog.defaultProps = {
  msg: "this link?",
};

export default DeleteDialog;
