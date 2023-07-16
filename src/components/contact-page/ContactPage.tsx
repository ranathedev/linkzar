import React from "react";

import ContactForm from "components/contact-form";

import stl from "./ContactPage.module.scss";

interface Props {
  theme: string;
}

const ContactPage = ({ theme }: Props) => {
  return (
    <div className={stl.contactPage}>
      <ContactForm theme={theme} />
    </div>
  );
};

export default ContactPage;
