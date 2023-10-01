import React, { useEffect } from "react";

import auth from "lib/firebase";
import Layout from "components/layout";
import URLShortener from "components/url-shortener";
import DemoContent from "components/demo-content";
import LoadingScreen from "components/loading-screen";

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
    const urlParams = new URLSearchParams(window.location.search);

    const mode = urlParams.get("mode");

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (mode !== "dev") {
        if (user) {
          location.href = "/dashboard";
        }
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const domainUrl = "https://linkzar.fly.dev/";

  return isLoading ? (
    <LoadingScreen />
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
          path="/shorten"
        />
        <DemoContent theme={theme} />
      </div>
    </Layout>
  );
};

export default Shorten;
