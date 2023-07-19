import React, { useEffect } from "react";

import About from "components/privacy";
import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";

const Overview = () => {
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
        <About theme={theme} />
      </Layout>
    </>
  );
};

export default Overview;
