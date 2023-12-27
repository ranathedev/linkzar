import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { sendEmail } from 'lib/utils'
import Button from 'components/button'
import Toast from 'components/toast'

import ContactImage from 'assets/contact-2.png'
import SendIcon from 'assets/send.svg'

import stl from './ContactForm.module.scss'

interface Props {
  theme: string
}

const ContactForm = ({ theme }: Props) => {
  const [className, setClassName] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastOpts, setToastOpts] = useState({ variant: '', msg: '' })

  useEffect(() => {
    if (theme === 'dark') setClassName(stl.darkContactForm)
    else setClassName('')
  }, [theme])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    msg: Yup.string().required('Message is required'),
  })

  return (
    <>
      <Toast
        theme={theme}
        isVisible={showToast}
        setShowToast={setShowToast}
        variant={toastOpts.variant}
        content={toastOpts.msg}
      />
      <section className={clsx(stl.contactForm, className)}>
        <div className={stl.container}>
          <h2 className={stl.heading}>Contact Us</h2>
          <p className={stl.desc}>
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <Formik
            initialValues={{ name: '', email: '', msg: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              sendEmail(values, setShowToast, setToastOpts)
              actions.resetForm()
            }}
          >
            <Form action="#" className={stl.form}>
              <div>
                <label htmlFor="name">Your name</label>
                <Field
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  spellCheck={false}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={stl.error}
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className={stl.error}
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
                <ErrorMessage
                  name="msg"
                  component="div"
                  className={stl.error}
                />
              </div>
              <div className={stl.btnContainer}>
                <Button
                  theme="light"
                  type="submit"
                  label="Send message"
                  leftIcon={<SendIcon />}
                />
              </div>
            </Form>
          </Formik>
        </div>
        <div className={stl.img}>
          <Image src={ContactImage} priority alt="contact-service" />
        </div>
      </section>
    </>
  )
}

export default ContactForm
