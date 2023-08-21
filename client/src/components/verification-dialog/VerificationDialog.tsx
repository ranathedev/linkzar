import React, { useEffect } from "react";
import clsx from "clsx";

import { sendVerificationEmail } from "lib/authFunctions";

import stl from "./VerificationDialog.module.scss";
import Spinner from "components/spinner";

interface Props {
  theme: string;
  user: any;
}

const VerificationDialog = ({ theme, user }: Props) => {
  const [className, setClassName] = React.useState("");
  const [loading, setLoading] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkVerifyDialog);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const handleResend = async () => {
    setLoading("Sending Verification Email");
    await sendVerificationEmail(user);
    setLoading("");
  };

  return (
    <div className={clsx(stl.verifyDialog, className)}>
      {loading === "" ? (
        <>
          <p>
            <b>Congratulations!</b>&nbsp;Your account has been created
            successfully. To get started, please check your email inbox and
            click on the verification link we&apos;ve sent you. Once your email
            is verified, you&apos;ll be able to access all the features of our
            app.
          </p>
          <span className={stl.resendContainer}>
            Didn&apos;t get the Verification link?
            <span onClick={handleResend}>Resend</span>
          </span>
        </>
      ) : (
        <div className={stl.loadingContainer}>
          <Spinner taskTitle={loading} variant="secondary" />
        </div>
      )}
    </div>
  );
};

export default VerificationDialog;
