import React, { useEffect } from "react";
import clsx from "clsx";

import {
  updateName,
  handleUpdateEmail,
  handleUpdatePass,
  logOut,
  deleteAccount,
} from "lib/authFunctions";
import Button from "components/button";
import AvatarContainer from "components/avatar-container";
import Modal from "components/modal";
import DialogBox from "components/dialog-box";
import Toast from "components/toast";
import Spinner from "components/spinner";

import stl from "./UserInfoSettings.module.scss";

interface Props {
  theme: string;
  user: any;
  setUser: (arg: any) => void;
}

const UserInfoSettings = ({ theme, user, setUser }: Props) => {
  const [className, setClassName] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastOpts, setToastOpts] = React.useState({ variant: "", msg: "" });
  const [loading, setLoading] = React.useState("");
  const [dialogOpts, setDialogOpts] = React.useState({
    primaryBtnLabel: "Yes, Delete",
    msg: "Are you sure want to delete your account?",
    handleAction: () => {},
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkUserInforSet);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const changeName = async () => {
    await updateName(name, setUser, setShowToast, setToastOpts, setLoading);

    setName("");
  };

  const changeEmail = async () => {
    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (validateEmail()) {
      await handleUpdateEmail(
        email,
        setUser,
        setShowToast,
        setToastOpts,
        setShowDialog,
        setDialogOpts,
        setLoading
      );
    } else {
      setShowToast(true);
      setToastOpts({ variant: "warn", msg: "Email address is not valid." });
    }

    setEmail("");
  };

  const changePass = async () => {
    await handleUpdatePass(
      newPass,
      setShowToast,
      setToastOpts,
      setShowDialog,
      setDialogOpts,
      setLoading
    );

    setNewPass("");
  };

  const showDeleteDialog = () => {
    setDialogOpts({
      primaryBtnLabel: "Yes, Delete",
      msg: "Are you sure want to delete your account?",
      handleAction: handleDelete,
    });
    setShowDialog(true);
  };

  const handleDelete = () => {
    deleteAccount(setShowDialog, setDialogOpts, setShowToast, setToastOpts);
    setShowDialog(false);
  };

  return (
    <>
      <Modal
        theme={theme}
        isVisible={showDialog}
        dialog={
          <DialogBox
            theme={theme}
            isVisible={showDialog}
            handleAction={dialogOpts.handleAction}
            handleCancel={() => setShowDialog(false)}
            msg={dialogOpts.msg}
            primaryBtnLabel={dialogOpts.primaryBtnLabel}
          />
        }
      />
      <Toast
        theme={theme}
        isVisible={showToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
        setShowToast={setShowToast}
      />
      <div className={clsx(stl.userInfoSettings, className)}>
        <h1 className={stl.heading}>Edit Profile</h1>
        <div className={stl.container}>
          <AvatarContainer
            theme={theme}
            user={user}
            setUser={setUser}
            setShowToast={setShowToast}
            setToastOpts={setToastOpts}
            customClass={stl.avatar}
          />
          <div className={stl.basicInfo}>
            {loading === "Updating Name" ? (
              <Spinner taskTitle={loading} />
            ) : (
              <div className={stl.inputContainer}>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  placeholder={user.displayName}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <div
                  className={clsx(
                    stl.btnContainer,
                    name !== "" ? stl.show : ""
                  )}
                >
                  <Button
                    theme={theme}
                    label="Change Name"
                    handleOnClick={changeName}
                  />
                </div>
              </div>
            )}
            {loading === "Updating Email" ? (
              <Spinner taskTitle={loading} />
            ) : (
              <div className={stl.inputContainer}>
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  name="email"
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <div
                  className={clsx(
                    stl.btnContainer,
                    email !== "" ? stl.show : ""
                  )}
                >
                  <Button
                    theme={theme}
                    label="Change Email"
                    handleOnClick={changeEmail}
                  />
                </div>
              </div>
            )}
            {loading === "Updating Password" ? (
              <Spinner taskTitle={loading} />
            ) : (
              <div className={stl.inputContainer}>
                <label htmlFor="newPass">New Password</label>
                <input
                  type="password"
                  name="newPass"
                  placeholder="Enter your new password"
                  onChange={(e) => setNewPass(e.target.value)}
                  value={newPass}
                />
                <div
                  className={clsx(
                    stl.btnContainer,
                    newPass !== "" ? stl.show : ""
                  )}
                >
                  <Button
                    theme={theme}
                    label="Change Password"
                    handleOnClick={changePass}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={stl.accContainer}>
            <div className={stl.inputContainer}>
              <label>Logout</label>
              <div className={stl.msg}>Log out from account?</div>
              <div className={clsx(stl.btnContainer, stl.logoutBtn)}>
                <Button
                  theme={theme}
                  label="Log out"
                  handleOnClick={() => logOut(setShowToast, setToastOpts)}
                />
              </div>
            </div>
            <div className={stl.inputContainer}>
              <label>Delete this account</label>
              <div className={stl.msg}>
                Your data will be lost and cannot be recovered.
              </div>
              <div className={clsx(stl.btnContainer, stl.delBtn)}>
                <Button
                  theme={theme}
                  label="Delete"
                  handleOnClick={showDeleteDialog}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoSettings;
