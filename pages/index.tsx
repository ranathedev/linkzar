import React from "react";

// import Overview from "./overview";
import Sidebar from "components/sidebar";

export default function Home() {
  //@ts-ignore
  const [theme, setTheme] = React.useState("dark");

  return (
    <main>
      <Sidebar theme={theme} />
    </main>
  );
}
