import React, { useEffect } from "react";

// import Overview from "./overview";
import URLShortener from "components/url-shortener";

export default function Home() {
  const [theme, setTheme] = React.useState("light");

  useEffect(() => {
    setTheme("");
  }, []);

  return (
    <main>
      <URLShortener theme={theme} />
    </main>
  );
}
