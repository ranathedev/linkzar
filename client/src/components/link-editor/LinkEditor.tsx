import React, { useEffect } from "react";
import clsx from "clsx";

import { editLink } from "lib/utils";
import Button from "components/button";
import InputError from "components/input-error";

import stl from "./LinkEditor.module.scss";

interface Props {
  theme: string;
  showEditor: boolean;
  setShowEditor: (arg: boolean) => void;
  linkId: string;
}

const LinkEditor = ({ theme, showEditor, setShowEditor, linkId }: Props) => {
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

  const handleSubmit = () => {
    if (value.length < 5) {
      setError("Alias cannot be less than 5 chars.");
    } else {
      setError("");
      setShowEditor(false);
      editLink(linkId, value);
    }
  };

  const handleKeyDown = (e: any) => {
    e.keyCode === 13 && handleSubmit();
  };

  return (
    <div
      className={clsx(stl.LinkEditor, showEditor ? stl.show : "", className)}
    >
      <input
        id="editerInput"
        placeholder="Alias must be 5 char long."
        onChange={isAlphanumeric}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <InputError theme={theme} error={error} />
      <div className={stl.btnContainer}>
        <Button
          theme={theme}
          label="Cancel"
          variant="secondary"
          handleOnClick={() => setShowEditor(false)}
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
  linkId: "",
};

export default LinkEditor;
