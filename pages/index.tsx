import React from "react";
import Head from "next/head";
import Header from "components/header";
// import Intro from "components/intro";
import ToggleThemeBtn from "components/toggle-theme-btn";
import HeroSection from "components/hero-section";

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
      <main>
        <Header theme={theme} />
        <ToggleThemeBtn
          handleOnClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        {/* <Intro theme={theme} /> */}
        <HeroSection theme={theme} />
      </main>
    </>
  );
}
