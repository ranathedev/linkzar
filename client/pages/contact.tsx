import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from 'components/layout'
import ContactForm from 'components/contact-form'

const Contact = () => {
  const [user, setUser] = useState({})
  const theme = useSelector((state: { theme: string }) => state.theme)

  useEffect(() => {
    const data = localStorage.getItem('user')
    //@ts-ignore
    const user = JSON.parse(data)
    setUser(user)
  }, [])

  return (
    <Layout theme={theme} user={user} title="Contact | Linkzar">
      <ContactForm theme={theme} />
    </Layout>
  )
}

export default Contact
