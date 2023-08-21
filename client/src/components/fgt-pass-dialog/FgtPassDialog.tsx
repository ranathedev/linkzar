import React, { useEffect } from "react";
import clsx from "clsx";
import * as Yup from "yup";

import { sendResetPasswordEmail } from "lib/authFunctions";
import Button from "components/button";

import ArrowIcon from "assets/arrow-left.svg";

import stl from "./FgtPassDialog.module.scss";

interface Props {
  theme: string;
  setResetPass: (arg: boolean) => void;
}

const FgtPassDialog = ({ theme, setResetPass }: Props) => {
  const [className, setClassName] = React.useState("");
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkFgtPassDialog);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const handleSubmit = async () => {
    try {
      await Yup.string().email().validate(email);
      sendResetPasswordEmail(email);
    } catch (error) {
      console.log("Invalid email address");
    }

    setEmail("");
  };

  return (
    <div className={clsx(stl.fgtPassDialog, className)}>
      <div className={stl.content}>
        <div className={stl.heading}>Forgot password?</div>
        <span className={stl.headline}>
          No worries, we&apos;ll send you reset instructions.
        </span>
      </div>
      <div className={stl.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className={stl.btnContainer}>
        <Button
          theme={theme}
          label="Reset password"
          type="submit"
          handleOnClick={handleSubmit}
        />
        <Button
          theme={theme}
          leftIcon={<ArrowIcon />}
          label="Back to log in"
          variant="secondary"
          handleOnClick={() => setResetPass(false)}
        />
      </div>
    </div>
  );
};

export default FgtPassDialog;
