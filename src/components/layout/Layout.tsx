import React, { useEffect } from "react";
import Head from "next/head";

import Header from "components/header";
import Footer from "components/footer";

import stl from "./Layout.module.scss";

interface Props {
  theme: string;
  children: React.ReactNode;
  title: string;
}

const Layout = ({ theme, children, title }: Props) => {
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
        <title>{`Linkzar | ${title}`}</title>
        <meta name="description" content="URL Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={className}>
        <Header theme={theme} />
        {children}
        <Footer theme={theme} />
      </main>
    </>
  );
};

export default Layout;
