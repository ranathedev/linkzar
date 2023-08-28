import React, { useEffect } from "react";
import Head from "next/head";

import Header from "components/header";
import Footer from "components/footer";

import stl from "./Layout.module.scss";

interface Props {
  theme: string;
  children: React.ReactNode;
  title: string;
  setTheme: (arg: any) => void;
  user: any;
}

const Layout = ({ theme, children, title, setTheme, user }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkMain);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <>
      <Head>
        <title>{`${title} | Linkzar`}</title>
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
      <main className={className}>
        <Header theme={theme} setTheme={setTheme} user={user} />
        {children}
        <Footer theme={theme} />
      </main>
    </>
  );
};

Layout.defaultProps = {
  user: null,
};

export default Layout;
