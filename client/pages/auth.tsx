import React, { useEffect } from "react";
import Head from "next/head";
import clsx from "clsx";

import ToggleThemeBtn from "components/toggle-theme-btn";
import AuthForm from "components/auth-form";
import AuthSideContent from "components/auth-side-content";

import stl from "./index.module.scss";

const Auth = () => {
  const [className, setClassName] = React.useState("");
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
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkAbout);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <>
      <Head>
        <title>Linkzar | Auth</title>
        <meta name="description" content="URL Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="android-chrome"
          sizes="512x512"
          href="favicon/android-chrome-512x512.png"
        />
        <link
          rel="android-chrome"
          sizes="192x192"
          href="favicon/android-chrome-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
      </Head>
      <ToggleThemeBtn
        theme={theme}
        handleOnClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      />
      <main className={clsx(stl.about, className)}>
        <div className={stl.formContainer}>
          <AuthForm theme={theme} />
        </div>
        <AuthSideContent />
      </main>
    </>
  );
};

export default Auth;
