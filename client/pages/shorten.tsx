import React, { useEffect } from "react";

import Layout from "components/layout";
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
    <Layout theme={theme} setTheme={setTheme} title="Shorten">
      <div className={stl.shorten}>
        <URLShortener
          domainUrl={domainUrl}
          isVisible={true}
          theme={theme}
          sendNewLink={() => {}}
          sendDeleteId={() => {}}
          uid=""
        />
      </div>
    </Layout>
  );
};

export default Shorten;
