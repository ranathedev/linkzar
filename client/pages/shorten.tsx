import React, { useEffect } from "react";

import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";
import URLShortener from "components/url-shortener";

import stl from "./index.module.scss";

const Shorten = () => {
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

  const domainUrl = "http://localhost:3001/";

  return (
    <>
      <ToggleThemeBtn
        theme={theme}
        handleOnClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      />
      <Layout theme={theme} title="Overview">
        <div className={stl.shorten}>
          <URLShortener domainUrl={domainUrl} isVisible={true} theme={theme} />
        </div>
      </Layout>
    </>
  );
};

export default Shorten;
