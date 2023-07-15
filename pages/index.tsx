import React from "react";
import Head from "next/head";

import Header from "components/header";
import ToggleThemeBtn from "components/toggle-theme-btn";
// import Homepage from "./Homepage";
// import Footer from "components/footer";
import ContactForm from "components/contact-form";

import stl from "./index.module.scss";

export default function Home() {
  const [theme, setTheme] = React.useState("light");

  return (
    <>
      <Head>
        <title>Linkzar</title>
        <meta name="description" content="URL Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={stl[`${theme}Main`]}>
        <Header theme={theme} />
        <ToggleThemeBtn
          handleOnClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        {/* <Homepage theme={theme} /> */}
        {/* <Footer theme={theme} /> */}
        <ContactForm theme={theme} />
      </main>
    </>
  );
}
