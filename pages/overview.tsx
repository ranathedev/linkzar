import React from "react";

import Homepage from "components/homepage";
import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";

const Overview = () => {
  const [theme, setTheme] = React.useState("light");

  return (
    <>
      <ToggleThemeBtn
        handleOnClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <Layout theme={theme} children={<Homepage theme={theme} />} />;
    </>
  );
};

export default Overview;
