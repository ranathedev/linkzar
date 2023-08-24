import React, { useEffect } from "react";

import Homepage from "components/homepage";
import Layout from "components/layout";

const Overview = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <Layout theme={theme} setTheme={setTheme} title="Overview">
      <Homepage theme={theme} />
    </Layout>
  );
};

export default Overview;
