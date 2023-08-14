import React, { useEffect } from "react";
import clsx from "clsx";

import { handleDelLink } from "lib/utils";
import Button from "components/button";

import stl from "./DeleteDialog.module.scss";

interface Props {
  theme: string;
  isVisible: boolean;
  id: string;
  setShowDialog: (arg: boolean) => void;
  getResponse: (arg: any) => void;
  setIsLoading: (arg: boolean) => void;
}

const DeleteDialog = ({
  theme,
  isVisible,
  id,
  setShowDialog,
  getResponse,
  setIsLoading,
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

  const handleDelete = () => {
    handleDelLink(id, setIsLoading, getResponse);
    setShowDialog(false);
  };

  return (
    <div className={clsx(stl.delDialog, isVisible ? stl.show : "", className)}>
      <span>Are you sure you want to delete this link?</span>
      <div className={stl.btnContainer}>
        <Button
          variant="secondary"
          theme={theme}
          label="Cancel"
          handleOnClick={() => setShowDialog(false)}
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

export default DeleteDialog;
