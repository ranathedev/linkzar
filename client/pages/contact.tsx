import React, { useEffect } from "react";

import Layout from "components/layout";
import ContactForm from "components/contact-form";

const Contact = () => {
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
    <Layout theme={theme} setTheme={setTheme} title="Contact">
      <ContactForm theme={theme} />
    </Layout>
  );
};

export default Contact;
