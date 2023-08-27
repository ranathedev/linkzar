import React, { useEffect } from "react";

import Layout from "components/layout";
import AvatarHandler from "components/avatar-handler";
import UserInfoSettings from "components/user-info-settings";
import LoadingScreen from "components/loading-screen";

import stl from "./index.module.scss";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState({
    fname: "John",
    lname: "Doe",
    email: "johndoe@gmail.com",
    displayName: "John Doe",
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
    if (user) {
      setUser(user);
    }

    setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <Layout theme={theme} setTheme={setTheme} title="Settings">
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
      )}
    </Layout>
  );
};

export default SettingsPage;
