import React, { useEffect } from "react";

import About from "components/about";
import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";

const AboutPage = () => {
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
      <Layout theme={theme} setTheme={setTheme} title="About">
        <About theme={theme} />
      </Layout>
    </>
  );
};

export default AboutPage;
