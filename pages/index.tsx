import React from "react";
import Head from "next/head";
import Header from "components/header";
// import Intro from "components/intro";
import ToggleThemeBtn from "components/toggle-theme-btn";
// import FAQSection from "components/faq-section";
// import HeroSection from "components/hero-section";

import stl from "./index.module.scss";
import Footer from "components/footer";

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
        {/* <Intro theme={theme} /> */}
        {/* <HeroSection theme={theme} swap={true} /> */}
        {/* <FAQSection theme={theme} /> */}
        <Footer theme={theme} />
      </main>
    </>
  );
}
