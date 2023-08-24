import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";

import { sendEmail } from "lib/utils";
import Button from "components/button";

import ContactImage from "assets/contact-2.png";
import SendIcon from "assets/send.svg";

import stl from "./ContactForm.module.scss";

interface Props {
  theme: string;
}

const ContactForm = ({ theme }: Props) => {
  const [className, setClassName] = React.useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        setClassName(stl.darkContactForm);
      } else {
        setClassName("");
      }
    }
  }, [theme]);

  return (
    <section className={clsx(stl.contactForm, className)}>
      <div className={stl.container}>
        <h2 className={stl.heading}>Contact Us</h2>
        <p className={stl.desc}>
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <Formik
          initialValues={{ name: "", email: "", msg: "" }}
          onSubmit={(values, actions) => {
            sendEmail(values);
            actions.resetForm();
          }}
        >
          {(props) => (
            <Form action="#" className={stl.form}>
              <div>
                <label htmlFor="name">Your name</label>
                <Field
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  spellCheck={false}
                />
              </div>
              <div>
                <label htmlFor="email">Your email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label htmlFor="msg">Your message</label>
                <Field
                  as="textarea"
                  name="msg"
                  id="msg"
                  placeholder="Leave a comment..."
                />
              </div>
              <div className={stl.btnContainer}>
                <Button
                  theme="light"
                  label="Send message"
                  leftIcon={<SendIcon />}
                  handleOnClick={() => props.submitForm()}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={stl.img}>
        <Image src={ContactImage} alt="image" />
      </div>
    </section>
  );
};

export default ContactForm;
