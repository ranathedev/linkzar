import React, { useEffect } from "react";

import Homepage from "components/homepage";
import Layout from "components/layout";

const Overview = () => {
  const [user, setUser] = React.useState({});
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

  useEffect(() => {
    const data = localStorage.getItem("user");
    //@ts-ignore
    const user = JSON.parse(data);
    setUser(user);
  }, []);

  return (
    <Layout theme={theme} setTheme={setTheme} user={user} title="Overview">
      <Homepage theme={theme} />
    </Layout>
  );
};

export default Overview;
