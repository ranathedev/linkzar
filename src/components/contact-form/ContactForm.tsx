import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";

import Button from "components/button";

import ContactImage from "assets/contact-2.png";

import stl from "./ContactForm.module.scss";

interface Props {
  theme: string;
}

const ContactForm = ({ theme }: Props) => {
  return (
    <section className={clsx(stl.contactForm, stl[`${theme}ContactForm`])}>
      <div className={stl.container}>
        <h2 className={stl.heading}>Contact Us</h2>
        <p className={stl.desc}>
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <Formik
          initialValues={{ name: "", email: "", msg: "" }}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.resetForm();
          }}
        >
          {(props) => (
            <Form action="#" className={stl.form}>
              <div>
                <label htmlFor="name">Your name</label>
                <Field name="name" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="subject">Your email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label htmlFor="message">Your message</label>
                <Field
                  as="textarea"
                  name="msg"
                  placeholder="Leave a comment..."
                />
              </div>
              <div className={stl.btnContainer}>
                <Button
                  theme="light"
                  label="Send message"
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
