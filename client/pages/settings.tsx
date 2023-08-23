import React, { useEffect } from "react";

import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";
import AvatarHandler from "components/avatar-handler";
import UserInfoSettings from "components/user-info-settings";

import stl from "./index.module.scss";

const SettingsPage = () => {
  const [user, setUser] = React.useState({
    fname: "John",
    lname: "Doe",
    email: "johndoe@gmail.com",
    displayName: "",
    photoURL: "https://i.postimg.cc/Mp7gnttP/default-Pic.jpg",
  });
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    setUser(user);
  }, []);

  return (
    <>
      <ToggleThemeBtn
        theme={theme}
        handleOnClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      />
      <Layout theme={theme} title="Settings">
        <div className={stl.settings}>
          <div className={stl.container}>
            <AvatarHandler
              theme={theme}
              customClass={stl.avatarHandler}
              user={user}
              setUser={setUser}
            />
            <div className={stl.wrapper}>
              <UserInfoSettings theme={theme} user={user} setUser={setUser} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SettingsPage;
