import React, { useEffect } from "react";
import clsx from "clsx";

import Button from "components/button";

import stl from "./UserInfoSettings.module.scss";

interface Props {
  theme: string;
}

const UserInfoSettings = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setNewPass] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkUserInforSet);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  const changeName = () => {
    console.log("Fname:", fname);
    console.log("Lname:", lname);
    setFname("");
    setLname("");
  };

  const changeEmail = () => {
    console.log("Email:", email);
    setEmail("");
  };

  const changePass = () => {
    console.log("Current pass:", currentPass);
    console.log("New pass:", newPass);
    setCurrentPass("");
    setNewPass("");
  };

  return (
    <div className={clsx(stl.userInfoSettings, className)}>
      <h1 className={stl.heading}>Edit Profile</h1>
      <div className={stl.container}>
        <div
          className={clsx(
            stl.nameContainer,
            fname !== "" || lname !== "" ? stl.show : ""
          )}
        >
          <div className={stl.inputContainer}>
            <label htmlFor="fname">First name</label>
            <input
              name="fname"
              placeholder="John"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
          </div>
          <div className={stl.inputContainer}>
            <label htmlFor="lname">Last name</label>
            <input
              name="lname"
              placeholder="Doe"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
          </div>
          <Button theme={theme} label="Save" handleOnClick={changeName} />
        </div>
        <div className={clsx(stl.emailContainer, email !== "" ? stl.show : "")}>
          <div className={stl.inputContainer}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <Button theme={theme} label="Save" handleOnClick={changeEmail} />
        </div>
        <div
          className={clsx(
            stl.passContainer,
            currentPass !== "" && newPass !== "" ? stl.show : ""
          )}
        >
          <div className={stl.inputContainer}>
            <label htmlFor="currentPass">Current Password</label>
            <input
              type="password"
              name="currentPass"
              placeholder="Enter your current password"
              onChange={(e) => setCurrentPass(e.target.value)}
              value={currentPass}
            />
          </div>
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
          <Button theme={theme} label="Save" handleOnClick={changePass} />
        </div>
      </div>
    </div>
  );
};

export default UserInfoSettings;
