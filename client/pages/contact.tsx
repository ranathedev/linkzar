import React, { useEffect } from "react";

import Layout from "components/layout";
import ContactForm from "components/contact-form";

const Contact = () => {
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
    <Layout theme={theme} setTheme={setTheme} user={user} title="Contact">
      <ContactForm theme={theme} />
    </Layout>
  );
};

export default Contact;
