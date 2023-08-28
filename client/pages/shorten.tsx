import React, { useEffect } from "react";

import Layout from "components/layout";
import URLShortener from "components/url-shortener";
import Spinner from "components/spinner";
import DemoContent from "components/demo-content";

import stl from "./index.module.scss";

const Shorten = () => {
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
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
    setIsLoading(false);
  }, []);

  const domainUrl = "http://localhost:3001/";

  return isLoading ? (
    <Spinner taskTitle="" />
  ) : (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Shorten">
      <div className={stl.shorten}>
        <URLShortener
          domainUrl={domainUrl}
          isVisible={true}
          theme={theme}
          sendNewLink={() => {}}
          sendDeleteId={() => {}}
          uid="links"
        />
        <DemoContent theme={theme} />
      </div>
    </Layout>
  );
};

export default Shorten;
