import React, { useEffect } from "react";
import Head from "next/head";
import HeroSection from "components/hero-section";

export default function Home() {
  const [theme, setTheme] = React.useState("light");

  let isDarkMode = false;

  if (typeof window !== "undefined") {
    isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  useEffect(() => {
    isDarkMode ? setTheme("dark") : setTheme("light");
  }, [isDarkMode]);

  return (
    <>
      <Head>
        <title>Linkzar</title>
        <meta name="description" content="URL Shortener" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection theme={theme} />
      </main>
    </>
  );
}
