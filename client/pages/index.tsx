import React from "react";

// import Overview from "./overview";
import URLShortener from "components/url-shortener";

export default function Home() {
  //@ts-ignore
  const [theme, setTheme] = React.useState("light");

  return (
    <main>
      <URLShortener theme={theme} />
    </main>
  );
}
