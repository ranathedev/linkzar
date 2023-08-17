import React, { useEffect } from "react";
import clsx from "clsx";

import { editLink } from "lib/utils";
import Button from "components/button";
import InputError from "components/input-error";

import stl from "./LinkEditor.module.scss";

interface Props {
  theme: string;
  showEditor: boolean;
  linkData: {
    id: string;
    shortId: string;
    originalURL: string;
    dateCreated: string;
    clicks: number;
  };
  setShowEditor: (arg: boolean) => void;
  sendResponse: (arg: any) => void;
  setLoading: (arg: string) => void;
  setShowModal: (arg: boolean) => void;
}

const LinkEditor = ({
  theme,
  showEditor,
  linkData,
  setShowEditor,
  sendResponse,
  setLoading,
  setShowModal,
}: Props) => {
  const [error, setError] = React.useState("");
  const [value, setValue] = React.useState("");
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkLinkEditor);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  useEffect(() => {
    if (!showEditor) {
      setValue("");
    }
  }, [showEditor]);

  useEffect(() => {
    setValue(linkData.shortId);
  }, [linkData.shortId]);

  const isAlphanumeric = (e: any) => {
    const input = e.target;
    const inputVal = input.value;
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    const isAlphanumeric = alphanumericRegex.test(inputVal);

    if (inputVal.length <= 7) {
      if (!isAlphanumeric) {
        setValue(inputVal.replace(/[^a-zA-Z0-9]/g, ""));
        setError("Only alphanumeric characters are allowed.");
      } else {
        setValue(inputVal);
        setError("");
      }
    } else {
      setError("Alias cannot be more than 7 chars.");
    }
  };

  const handleSubmit = async () => {
    setLoading("Editing link");

    if (value.length < 5) {
      setError("Alias cannot be less than 5 chars.");
    } else {
      setError("");
      setShowEditor(false);
      const response = await editLink(linkData.id, value);
      sendResponse(response);
    }

    setLoading("");
  };

  const handleKeyDown = (e: any) => {
    e.keyCode === 13 && handleSubmit();
  };

  const handleCancel = () => {
    setShowEditor(false);
    setShowModal(false);
  };

  return (
    <div
      className={clsx(stl.linkEditor, showEditor ? stl.show : "", className)}
    >
      <input
        id="editerInput"
        placeholder="Enter new alias."
        onChange={isAlphanumeric}
        onKeyDown={handleKeyDown}
        value={value}
        spellCheck={false}
      />
      <InputError theme={theme} error={error} />
      <div className={stl.btnContainer}>
        <Button
          theme={theme}
          label="Cancel"
          variant="secondary"
          handleOnClick={handleCancel}
        />
        <Button
          theme={theme}
          label="Change"
          variant="primary"
          handleOnClick={handleSubmit}
        />
      </div>
    </div>
  );
};

LinkEditor.defaultProps = {
  showEditor: false,
  linkData: {
    id: "1234567890",
    shortId: "aftab",
    originalURL: "https://www.google.com/",
    clickCounts: 300,
    dateCreated: "10-Aug-2023",
  },
};

export default LinkEditor;
