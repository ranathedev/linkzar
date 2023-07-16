import React from "react";
import Head from "next/head";

import Header from "components/header";
import Footer from "components/footer";

import stl from "./Layout.module.scss";

interface Props {
  theme: string;
  children: React.ReactNode;
}

const Layout = ({ theme, children }: Props) => {
  return (
    <>
      <Head>
        <title>Linkzar | Contact</title>
        <meta name="description" content="URL Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stl[`${theme}Main`]}>
        <Header theme={theme} />
        {children}
        <Footer theme={theme} />
      </main>
    </>
  );
};

export default Layout;
