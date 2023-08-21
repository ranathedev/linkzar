import React, { useEffect } from "react";

import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";
import AvatarHandler from "components/avatar-handler";
import UserInfoSettings from "components/user-info-settings";

import stl from "./index.module.scss";

const SettingsPage = () => {
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

  return (
    <>
      <ToggleThemeBtn
        theme={theme}
        handleOnClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      />
      <Layout theme={theme} title="Overview">
        <div className={stl.settings}>
          <div className={stl.container}>
            <AvatarHandler theme={theme} customClass={stl.avatarHandler} />
            <UserInfoSettings theme={theme} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SettingsPage;
