import React from 'react'

import { PageProps } from 'lib/type'
import Layout from 'components/layout'
import ContactForm from 'components/contact-form'

const Contact = ({ user, theme }: PageProps) => {
  return (
    <Layout theme={theme} user={user} title="Contact | Linkzar">
      <ContactForm theme={theme} />
    </Layout>
  )
}

export default Contact
