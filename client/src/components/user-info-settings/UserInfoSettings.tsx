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
import DeleteDialog from "components/delete-dialog";
import Toast from "components/toast";

import stl from "./UserInfoSettings.module.scss";

interface Props {
  theme: string;
  user: any;
  setUser: (arg: any) => void;
}

const UserInfoSettings = ({ theme, user, setUser }: Props) => {
  const [className, setClassName] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newPass, setNewPass] = React.useState("");
  const [showDialog, setShowDialog] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastOpts, setToastOpts] = React.useState({ variant: "", msg: "" });

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
    await updateName(fname + " " + lname, setUser, setShowToast, setToastOpts);

    setFname("");
    setLname("");
  };

  const changeEmail = async () => {
    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    if (validateEmail()) {
      await handleUpdateEmail(email, setUser, setShowToast, setToastOpts);
    } else {
      console.log("Email address is not valid.");
    }

    setEmail("");
  };

  const changePass = async () => {
    await handleUpdatePass(newPass, setShowToast, setToastOpts);

    setNewPass("");
  };

  const handleDelete = () => {
    deleteAccount();
    setShowDialog(false);
  };

  return (
    <>
      <Modal
        theme={theme}
        isVisible={showDialog}
        dialog={
          <DeleteDialog
            theme={theme}
            isVisible={showDialog}
            handleDelete={handleDelete}
            handleCancel={() => setShowDialog(false)}
            msg="your account?"
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
          <div className={stl.nameContainer}>
            <div className={stl.inputContainer}>
              <label htmlFor="fname">First name</label>
              <input
                name="fname"
                placeholder={user.fname !== "" ? user.fname : user.displayName}
                onChange={(e) => setFname(e.target.value)}
                value={fname}
              />
            </div>
            <div className={stl.inputContainer}>
              <label htmlFor="lname">Last name</label>
              <input
                name="lname"
                placeholder={user.lname}
                onChange={(e) => setLname(e.target.value)}
                value={lname}
              />
            </div>
            <div
              className={clsx(
                stl.btnContainer,
                fname !== "" || lname !== "" ? stl.show : ""
              )}
            >
              <Button theme={theme} label="Save" handleOnClick={changeName} />
            </div>
          </div>
          <div className={stl.emailContainer}>
            <div className={stl.inputContainer}>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                name="email"
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div
              className={clsx(stl.btnContainer, email !== "" ? stl.show : "")}
            >
              <Button theme={theme} label="Save" handleOnClick={changeEmail} />
            </div>
          </div>
          <div className={stl.passContainer}>
            <div className={stl.inputContainer}>
              <label htmlFor="newPass">New Password</label>
              <input
                type="password"
                name="newPass"
                placeholder="Enter your new password"
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
              />
            </div>
            <div
              className={clsx(stl.btnContainer, newPass !== "" ? stl.show : "")}
            >
              <Button theme={theme} label="Save" handleOnClick={changePass} />
            </div>
          </div>
          <div className={stl.delContainer}>
            <div className={stl.inputContainer}>
              <label>Logout</label>
              <div className={stl.msg}>Log out from account?</div>
            </div>
            <div className={clsx(stl.btnContainer, stl.logoutBtn)}>
              <Button theme={theme} label="Log out" handleOnClick={logOut} />
            </div>
            <div className={stl.inputContainer}>
              <label>Delete this account</label>
              <div className={stl.msg}>
                Your data will be lost and cannot be recovered.
              </div>
            </div>
            <div className={clsx(stl.btnContainer, stl.delBtn)}>
              <Button
                theme={theme}
                label="Delete"
                handleOnClick={() => setShowDialog(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoSettings;
