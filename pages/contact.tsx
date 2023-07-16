import React from "react";

import ContactPage from "components/contact-page";
import Layout from "components/layout";
import ToggleThemeBtn from "components/toggle-theme-btn";

const Contact = () => {
  const [theme, setTheme] = React.useState("light");

  return (
    <>
      <ToggleThemeBtn
        handleOnClick={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <Layout theme={theme} children={<ContactPage theme={theme} />} />
    </>
  );
};

export default Contact;
